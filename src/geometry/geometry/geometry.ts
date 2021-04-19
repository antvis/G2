import EE from '@antv/event-emitter';
import {
  AttributeKey,
  AttributeOptions,
  GeometryOption,
  AdjustOption,
  AttributeOption,
  Data,
  Datum,
} from '../../types';
import { GROUP_ATTR_KEYS, ORIGINAL_FIELD } from '../../constant';
import { createAttribute } from '../../util/attribute';
import { groupData } from '../../util/data';
import { Attribute } from '../attribute/attribute';

/**
 * 所有 Geometry 的基类
 */
export class Geometry extends EE {
  /**
   * 传入到 Geometry 的配置信息（更新时候的配置）
   */
  private options: GeometryOption;

  /**
   * 视觉通道映射配置 Key Value 结构
   */
  private attriubteOptios: AttributeOptions;
  /**
   * 生成的 attributes 实例
   */
  private attributes;
  /**
   * 设置的 adjust 配置
   */
  private adjustOptions: AdjustOption[];
  /**
   * 生成的 adjusts 实例
   */
  private adjusts;

  /**
   * 设置的 animate 动画配置
   */
  private animateOption;

  /**
   * 衍生数据，临时存储
   * 渲染之前，数据处理之后的数据
   */
  private beforeMappingData: Data[];

  constructor() {
    super();

    // 初始化一些值
    this.options = {
      data: [],
      scales: new Map(),
    };

    this.attriubteOptios = new Map();
    this.attributes = new Map();
  }

  /**
   * 初始化或者更新 adjust 实例
   */
  private updateAdjust() {
    // 遍历每一个 attrOption，各自创建 Attribute 实例
    this.attriubteOptios.forEach((attributeOption: AttributeOption, attributeKey: AttributeKey) => {
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
    this.attriubteOptios.forEach((attributeOption: AttributeOption, attributeKey: AttributeKey) => {
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
   * 处理数据过程（这里体现了核心图形语法数据处理过程），这里来一个 100 行的注释，毕竟是核心数据处理逻辑！
   * 数据加工：分组 -> 数字化 -> adjust
   */
  private processData() {
    const categoryPositionScales = this.getAttribute('position').scales.filter((s) => s.isCategory());

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

        // 2. 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
        // TODO 为什么要在分组的时候对位置中分类数字化
        return categoryPositionScales.map((scale) => {
          const field = scale.field;
          mappingDatum[field] = scale.mapping(field);
        });
      });
    });

    // 3. 进行数据调整
    // TODO 处理 adjust 实例
    this.beforeMappingData = scaledData;
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

    // 创建或者更新 attribute
    this.updateAttributes();

    // 处理数据，依赖 attribute，所以一定在 updateAttributes 之后
    this.processData();
  }

  /**
   * 渲染
   */
  public render() {}

  /**
   * 销毁
   */
  public destroy() {}

  /** 设置图形的视觉通道字段和配置       ************************************* */

  private setAttributeOption(attr: AttributeKey, fields: string, value?: any) {
    this.attriubteOptios.set(attr, {
      fields: fields.split('*'),
      value: value,
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
  public sequence() {}

  /**
   * custom 信息：custom
   * 用于做自定义 shape 中传入自定义信息
   */
  public custom(value: any) {
    this.setAttributeOption('custom', '', value);

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
      const fields = this.attriubteOptios.get(groupAttrKey)?.fields || [];

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
    const [x, y] = this.attriubteOptios.get('position').fields;
    return [x, y];
  }

  /**
   * 获得对应的 attribute 映射类
   * @param attributeKey
   */
  public getAttribute(attributeKey: string): Attribute {
    return this.attributes.get(attributeKey);
  }

  /**
   * 获取当前 Geometry 对应的 elements 绘图元素
   */
  public getElements() {}

  /**
   * 通过条件获取 element
   */
  public getElementsBy() {}

  /**
   * 获取 adjust 实例
   */
  public getAdjust() {}

  /**
   * 获取坐标系实例
   */
  public getCoordinate() {}
}
