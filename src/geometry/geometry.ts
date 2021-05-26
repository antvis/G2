import { isArray } from '@antv/util';
import { Visibility } from '../core';
import {
  AttributeKey,
  AttributeOptions,
  GeometryOption,
  AdjustOption,
  AttributeOption,
  Data,
  Datum,
  Scale,
  Adjust,
  ShapePoint,
} from '../types';
import { GROUP_ATTR_KEYS, ORIGINAL_FIELD } from '../constant';
import { createAttribute } from '../util/attribute';
import { groupData } from '../util/data';
import { getScaleUpdateOptionsAfterStack } from '../util/scale';
import { Attribute } from '../visual/attribute';
import { Element } from './element';

/**
 * 所有 Geometry 的基类
 */
export class Geometry extends Visibility {
  /**
   * geometry 的类型
   */
  public type: string = 'geometry';
  /**
   * 传入到 Geometry 的配置信息（更新时候的配置）
   */
  private options: GeometryOption;

  /**
   * 视觉通道映射配置 Key Value 结构
   */
  private attriubteOptions: AttributeOptions;

  /**
   * 生成的 attributes 实例
   */
  private attributes: Map<string, Attribute>;

  /**
   * 设置的 adjust 配置
   */
  private adjustOptions: AdjustOption[];

  /**
   * 生成的 adjusts 实例
   */
  private adjusts: Map<string, Adjust>;

  /**
   * 设置的 animate 动画配置
   */
  private animateOption;

  /**
   * 衍生数据，临时存储
   * 渲染之前，数据处理之后的数据
   */
  private beforeMappingData: Data[];

  /**
   * 生成的所有绘图元素 Element
   */
  private elements: Element[];

  constructor(option: GeometryOption) {
    super();

    // 初始化一些值
    this.options = {
      data: [],
      scales: new Map(),
      generatePoints: true,
      ...option,
    };

    this.attriubteOptions = new Map();
    this.attributes = new Map();
    this.elements = [];
  }

  /**
   * 初始化或者更新 adjust 实例
   */
  private updateAdjust() {
    // 遍历每一个 attrOption，各自创建 Attribute 实例
    this.attriubteOptions.forEach((attributeOption: AttributeOption, attributeKey: AttributeKey) => {
      if (!attributeOption) {
        return;
      }

      const { fields = [], value, callback } = attributeOption;
      const scales = fields.map((f: string) => this.options.scales.get(f));

      // 创建，并缓存起来
      this.attributes.set(attributeKey, createAttribute(attributeKey, scales));
    });
  }

  /**
   * 初始化或者更新 attribute 实例，在其中会利用创建的 scale
   */
  private updateAttributes() {
    // 遍历每一个 attrOption，各自创建 Attribute 实例
    this.attriubteOptions.forEach((attributeOption: AttributeOption, attributeKey: AttributeKey) => {
      if (!attributeOption) {
        return;
      }

      const { fields = [], value, callback } = attributeOption;
      const scales = fields.map((f: string) => this.options.scales.get(f));

      // 创建，并缓存起来
      // TODO 如果一直 update，且变更数据字段，可能导致内存泄露风险
      this.attributes.set(attributeKey, createAttribute(attributeKey, scales));
    });
  }

  /**
   * 处理数据过程（这里体现了核心图形语法数据处理过程），这里来一个 100 行的注释，毕竟是核心数据处理逻辑！
   * 数据加工：分组 -> 数字化 -> adjust
   */
  private processData() {
    const categoryPositionScales = this.getAttribute('position').scales.filter((s) =>
      s.isCategory(),
    );

    // 1. 数据根据分组字段，分组
    const groupedData = groupData(this.options.data, this.getGroupFields());

    // 2. 追加 ORIGINAL_FIELD，并且对位置维度进行数字化
    const scaledData = groupedData.map((subData: Data) => {
      return subData.map((datum: Datum) => {
        // 1. 追加原始数据
        const mappingDatum: Datum = {
          [ORIGINAL_FIELD]: datum,
          ...datum,
        };

        // 2. 将分类数据翻译成数子, 仅对位置相关的度量进行数字化处理
        // TODO 为什么要在分组的时候对位置中分类数字化
        return categoryPositionScales.map((scale) => {
          const field = scale.field;
          // @ts-ignore
          mappingDatum[field] = scale.mapping(field);
        });
      });
    });

    // 3. 进行数据调整
    // TODO 处理 adjust 实例

    this.beforeMappingData = scaledData;
  }

  /**
   * 调整度量范围。主要针对发生层叠以及一些特殊需求的 Geometry，比如:
   * - interval 下的柱状图 Y 轴默认从 0 开始
   * - interval 的 range 范围
   */
  private adjustScales() {
    const yScale = this.getYScale();

    // 1. 对于 stack 类型的 adjust。需要将数据进行一个调整
    if (yScale && this.getAdjust('stack')) {
      yScale.update(getScaleUpdateOptionsAfterStack(yScale, this.beforeMappingData));
    }

    // 2. ??? 还有什么
  }

  /** 生命周期函数       ************************************* */

  /**
   * 更新数据和配置
   */
  public update(options: GeometryOption) {
    this.options = {
      ...this.options,
      ...options,
    };

    // 1. 创建或者更新 attribute
    this.updateAttributes();

    // 2. 处理数据，依赖 attribute，所以一定在 updateAttributes 之后
    this.processData();

    // 3. 调整 scale
    this.adjustScales();
  }

  /**
   * 在映射数据之前，做的一些事情
   * @param beforeMappingData
   */
  private beforeMapping(beforeMappingData: Data[]) {
    beforeMappingData.reduce((prev: Data, curr: Data) => {
      // 1. 生成关键点信息，用于绘图
      this.generateShapePoints(curr);

      // 2. 形成 prev ---> next 单向链表
      if (prev) {
        prev[0].nextPoints = curr[0].points;
      }
      return curr;
    });

    return beforeMappingData;
  }

  /**
   * 生成 shape 的关键点
   * @param data
   */
  private generateShapePoints(data: Data) {
    const shapeFactory = this.getShapeFactory();
    const shapeAttr = this.getAttribute('shape');
    for (let index = 0; index < data.length; index++) {
      const obj = data[index];
      const cfg = this.createShapePointsCfg(obj);
      const shape = shapeAttr ? this.getAttributeValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }

  /**
   * 获取图形对应的 shapeFactory
   * // TODO 接入 shapeFactory
   */
  private getShapeFactory() {
    return {
      getShapePoints: (shapeType, cfg) => {},
    };
  }

  /**
   * 获取每个 Shape 对应的关键点数据。
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(datum: Datum): ShapePoint {
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    const x = this.normalizeValues(datum[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this.normalizeValues(datum[yScale.field], yScale);
    } else {
      y = datum.y ? datum.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined,
    };
  }

  /**
   * 获取 Y 轴上的最小值。
   */
  protected getYMinValue(): number {
    const yScale = this.getYScale();
    const { min, max } = yScale;

    return min >= 0
      ? min // 当值全位于正区间时
      : max <= 0
      ? max // 当值全位于负区间时
      : 0; // 其他
  }

  /**
   * 将数据归一化
   * @param values
   * @param scale
   */
  protected normalizeValues(values: any, scale: Scale): number | number[] {
    if (isArray(values)) {
      const rst = [];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        rst.push(scale.mapping(value));
      }
      return rst;
    }
    return scale.mapping(values);
  }

  /**
   * 进行映射，主要做两个事情，一个是：
   * 1. 属性的映射
   * 2. 位置属性额外进行坐标系的转换
   */
  private mapping(data: Data) {
    let attribute;
    let datum;

    for (let i = 0; i < data.length; i++) {
      datum = data[i];

      for (const k in this.attributes) {
        attribute = this.attributes[k];
      }
    }
  }

  /**
   * 绘制：将数据最终转化成 G 的 Shape
   */
  public paint() {
    const { beforeMappingData } = this;
    // 1. 生成关键点
    const dataArray = this.beforeMapping(beforeMappingData);

    let data;
    for (let i = 0; i < dataArray.length; i++) {
      data = dataArray[i];
      const mappingData = this.mapping(data);
    }
  }

  /**
   * 销毁
   */
  public destroy() {
    super.destroy();
  }

  /** 设置图形的视觉通道字段和配置       ************************************* */

  private setAttributeOption(attr: AttributeKey, fields: string, value?: any) {
    this.attriubteOptions.set(attr, {
      fields: fields ? fields.split('*') : [],
      value,
    });
  }

  /**
   * 位置通道：x, y
   */
  public position(fields: string) {
    this.setAttributeOption('position', fields);

    return this;
  }

  /**
   * 颜色通道：color
   * TODO: 这些通道要支持多个语法糖！
   */
  public color(fields: string, value: any) {
    this.setAttributeOption('color', fields, value);

    return this;
  }

  /**
   * 形状通道：shape
   */
  public shape(fields: string, value: any) {
    this.setAttributeOption('shape', fields, value);

    return this;
  }

  /**
   * 大小通道：size
   */
  public size(fields: string, value: any) {
    this.setAttributeOption('size', fields, value);

    return this;
  }

  /**
   * 数据标签通道：label
   */
  public label(fields: string, value: any) {
    this.setAttributeOption('label', fields, value);

    return this;
  }

  /**
   * tooltip 通道：tooltip
   */
  public tooltip(fields: string, value: any) {
    this.setAttributeOption('tooltip', fields, value);

    return this;
  }

  /**
   * sequence 序列通道：sequence
   * TODO: 扩展 timeline 组件 + 时序图
   */
  public sequence(fields: string, value: any) {
    this.setAttributeOption('sequence', fields, value);

    return this;
  }

  /**
   * custom 信息：custom
   * 用于做自定义 shape 中传入自定义信息
   */
  public custom(value: any) {
    this.setAttributeOption('custom', null, value);

    return this;
  }

  /**
   * sequence 序列通道：sequence
   */
  public adjust(type: string, adjustOption: AdjustOption) {
    this.adjustOptions = [
      {
        type,
        ...adjustOption,
      },
    ];

    return this;
  }

  /**
   * 设置动画配置
   * @param animateOption
   */
  public animate(animateOption: any) {
    this.animateOption = animateOption;
    return this;
  }

  /** 获取信息的 API         **************************************************************** */

  /**
   * 获取所有映射中的分组字段
   */
  public getGroupFields() {
    const groupFields = [];

    // 去重，且考虑性能
    const uniqMap = new Map<string, boolean>();

    for (let i = 0, length = GROUP_ATTR_KEYS.length; i < length; i++) {
      const groupAttrKey = GROUP_ATTR_KEYS[i];
      // 获取所有通道中的 fields，谨防空值
      const fields = this.attriubteOptions.get(groupAttrKey)?.fields || [];

      for (let j = 0; j < fields.length; j++) {
        const f = fields[j];

        if (!uniqMap.has(f)) {
          groupFields.push(f);
          uniqMap.set(f, true);
        }
      }
    }

    return groupFields;
  }

  /**
   * 获取 x y 字段
   */
  public getXYFields(): string[] {
    const [x, y] = this.attriubteOptions.get('position').fields;
    return [x, y];
  }

  public getAttriubteOptions() {
    return this.attriubteOptions;
  }

  /**
   * 获得对应的 attribute 映射类
   * @param attributeKey
   */
  public getAttribute(attributeKey: string): Attribute {
    return this.attributes.get(attributeKey);
  }

  /**
   * 返回 attribute 映射之后的数据
   * @param attr Attribute 图形属性实例。
   * @param datum
   * @returns
   */
  public getAttributeValues(attr: Attribute, datum: Datum) {
    const params = [];
    const scales = attr.scales;
    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i];
      const { field } = scale;
      if (scale.isIdentity()) {
        // @ts-ignore, yuzhanglong: 暂时不清楚作用，先用 ts-ignore 解决报错问题
        params.push(scale.values);
      } else {
        params.push(datum[field]);
      }
    }

    return attr.mapping(...params);
  }

  /**
   * 获取当前 Geometry 对应的 elements 绘图元素
   */
  public getElements() {
    return this.elements;
  }

  /**
   * 根据一定的规则查找 Geometry 的 Elements。
   *
   * ```typescript
   * getElementsBy((element) => {
   *   const data = element.getData();
   *
   *   return data.a === 'a';
   * });
   * ```
   *
   * @param condition 定义查找规则的回调函数。
   * @returns
   */
  public getElementsBy(condition: (element: Element) => boolean): Element[] {
    return this.elements.filter((element) => {
      return condition(element);
    });
  }

  /**
   * 获取 adjust 实例
   */
  public getAdjust(type: string): Adjust {
    return this.adjusts.get(type);
  }

  /**
   * 获取坐标系实例
   */
  public getCoordinate() {
    return this.options.coordinate;
  }

  /** 获取 x 轴对应的 scale 实例。 */
  public getXScale(): Scale {
    return this.options.scales.get(this.getXYFields()[0]);
  }

  /** 获取 y 轴对应的 scale 实例。 */
  public getYScale(): Scale {
    return this.options.scales.get(this.getXYFields()[1]);
  }
}
