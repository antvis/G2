import { deepMix, get, isArray, uniqueId } from '@antv/util';
import { Shape } from 'src/types/g';
import { ShapeRenderer } from 'src/types/factory';
import { Visibility } from '../core/visibility';
import {
  AttributeKey,
  AttributeOptions,
  GeometryOption,
  AdjustOption,
  AttributeOption,
  Data,
  Datum,
  Adjust,
  ShapePoint,
  MappingDatum,
  PlainObject,
  ShapeMarkerCfg,
  ShapeMarkerAttrs,
  ShapeInfo,
  Point,
} from '../types';
import { ALL_ATTR_KEYS, GROUP_ATTR_KEYS, ORIGINAL_FIELD } from '../constant';
import { createAttribute } from '../util/attribute';
import { createAdjust } from '../util/adjust';
import { diff } from '../util/diff';
import { getScaleUpdateOptionsAfterStack } from '../util/scale';
import { Attribute } from '../visual/attribute';
import { ScaleDef } from '../visual/scale';
import { Element } from './element';
import { getShape } from './factory';

/**
 * 所有 Geometry 的基类
 * ```ts
 * const g = new Geometry({});
 *
 * g.update({});
 *
 * g.paint();
 * ```
 */
export abstract class Geometry<O extends GeometryOption = GeometryOption> extends Visibility {
  public id = uniqueId('g_');

  /**
   * geometry 的类型
   * @override
   */
  public abstract type: string;

  /**
   * 默认的 shape type
   * @override
   */
  public abstract defaultShapeType: string;

  /**
   * 传入到 Geometry 的配置信息（更新时候的配置）
   */
  public options: O;

  /**
   * 缓存 map 形式的 element
   */
  protected elementsMap: Map<string, Element>;

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
  protected animateOption;

  /**
   * 衍生数据，临时存储
   * 渲染之前，数据处理之后的数据
   */
  private beforeMappingData: Data[];

  /**
   * 对应 shape type 的 shape renderer
   */
  private shapeRenderer: ShapeRenderer;

  constructor(option: O) {
    super();

    // 初始化一些值
    this.options = {
      data: [],
      scales: new Map(),
      generatePoints: true,
      theme: {},
      ...option,
    };

    this.attriubteOptions = new Map();
    this.attributes = new Map();
    this.elementsMap = new Map();
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
      this.attributes.set(
        attributeKey,
        createAttribute(attributeKey, {
          scales,
          value,
          callback,
        }),
      );
    });
  }

  /**
   * 处理数据过程（这里体现了核心图形语法数据处理过程），这里来一个 100 行的注释，毕竟是核心数据处理逻辑！
   * 数据加工：分组 -> 数字化 -> adjust
   */
  private processData() {
    const { data } = this.options;

    const categoryPositionScales = this.getAttribute('position').scales.filter((s) => s.isCategory());
    const groupFields = this.getGroupFields();

    // 1. 数据分组，然后对维度字段进行数字化
    const groupedDataMap: Record<string, Data> = {};
    for (let i = 0; i < data.length; i += 1) {
      const datum = data[i];
      const key = groupFields.map((f: string) => datum[f]).join('-');

      //  1.1. 追加原始数据
      const digitalDatum: Datum = {
        [ORIGINAL_FIELD]: datum,
        ...datum,
      };

      // 1.2. 将分类数据翻译成数子, 仅对位置相关的度量进行数字化处理
      // TODO 为什么要在分组的时候对位置中分类数字化（数组索引值）
      categoryPositionScales.forEach((scale) => {
        const field = scale.getField();
        digitalDatum[field] = scale.map(digitalDatum[field]);
      });

      // 1.3 分组
      if (groupedDataMap[key]) {
        groupedDataMap[key].push(digitalDatum);
      } else {
        groupedDataMap[key] = [digitalDatum];
      }
    }

    // 2. 转成数组
    let beforeMappingData = Object.values(groupedDataMap);

    // 3. 进行数据调整，处理 adjust 实例
    beforeMappingData = this.processAdjust(beforeMappingData);

    this.beforeMappingData = beforeMappingData;
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

  /**
   * 处理 adjust 调整实例
   * @param groupData
   * @returns
   */
  private processAdjust(groupData: Data[]): Data[] {
    this.adjusts = new Map();

    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const xField = xScale.getField();
    const yField = yScale ? yScale.getField() : null;

    return (this.adjustOptions || []).reduce((r: Data[], adjustOption: AdjustOption) => {
      const { type } = adjustOption;

      const cfg = {
        // todo 添加其他的一些属性配置
        ...adjustOption,
      };

      // 针对调整类型，做的一些额外配置
      const adjustInstance = createAdjust(type, cfg);

      this.adjusts.set(type, adjustInstance);

      return adjustInstance.process(r);
    }, groupData);
  }

  /** 生命周期函数       ************************************* */

  /**
   * 更新数据和配置
   */
  public update(options: Partial<O>) {
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
    beforeMappingData.reduce((prev: Data, curr: Data, idx: number) => {
      // 1. 生成关键点信息，用于绘图
      this.generateShapePoints(curr);

      // 2. 形成 prev ---> next 单向链表
      if (prev) {
        // 每个分组中的第一个元素保留链表信息
        // todo nextPoints 到底有啥用，如确确定需要，他应该和关键点信息一样，都属于抽象的绘图信息
        prev[0].nextPoints = curr[0].points;
      }
      return curr;
    }, undefined);

    return beforeMappingData;
  }

  /**
   * 生成 shape 的关键点
   * @param data
   */
  private generateShapePoints(data: Data) {
    const shapeAttr = this.getAttribute('shape');
    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      const shapePoint = this.createShapePointsCfg(datum);
      const shape = shapeAttr ? this.getAttributeValues(shapeAttr, datum) : this.defaultShapeType;
      // 不同的图形 shape，会有不同的关键点信息，所以需要拿到 shapeAttr 获得渲染的 shape type string
      // todo 之前的 mapping 会返回多种数据格式 string | string[]，不合理

      const points = this.getShapePoints(shape as unknown as string, shapePoint);

      datum.points = points;
    }
  }

  /**
   * 获取每个 Shape 对应的关键点数据。
   * @override
   * @param obj 经过分组 -> 数字化 -> adjust 调整后的数据记录
   * @returns
   */
  protected createShapePointsCfg(datum: Datum): ShapePoint {
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    const x = this.normalizeValues(datum[xScale.getField()], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this.normalizeValues(datum[yScale.getField()], yScale);
    } else {
      // todo 饼图的情况？
      y = datum.y ? datum.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.map(this.getYMinValue()) : undefined,
    };
  }

  /**
   * 获取 Y 轴上的最小值。
   */
  protected getYMinValue(): number {
    const yScale = this.getYScale();
    const { min, max } = yScale.getOption('domain');

    if (min > 0) {
      // 当值全位于正区间时
      return min;
    }
    if (max <= 0) {
      // 当值全位于负区间时
      return max;
    }
    return 0;
  }

  /**
   * 将数据归一化
   * @param values
   * @param scale
   */
  protected normalizeValues(values: any, scale: ScaleDef): number | number[] {
    if (isArray(values)) {
      const rst = [];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        rst.push(scale.map(value));
      }
      return rst;
    }
    return scale.map(values);
  }

  /**
   * 进行映射，主要做两个事情，一个是：
   * 1. 属性的映射
   * 2. 位置属性额外进行坐标系的转换
   */
  private mapping(data: Data) {
    const mappingData = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      const datum = data[i] as MappingDatum;

      // 使用 attribute 进行数据的映射
      this.attributes.forEach((attr, key) => {
        const { fields } = attr;

        const values = this.getAttributeValues(attr, datum);

        if (fields.length > 1) {
          // position 之类的生成多个字段的属性
          for (let i = 0; i < values.length; i += 1) {
            const val = values[i];
            const name = fields[i];
            datum[name] = isArray(val) && val.length === 1 ? val[0] : val; // 只有一个值时返回第一个属性值
          }
        } else {
          // values.length === 1 的判断是以下情况，获取用户设置的图形属性值
          // shape('a', ['dot', 'dash']), color('a', ['red', 'yellow'])
          datum[fields[0]] = values.length === 1 ? values[0] : values;
        }
      });

      // 使用 coordinate 进行坐标的转换（将 x、y 转换成画布坐标）
      this.convertPoint(datum);

      mappingData[i] = datum;
    }

    return mappingData;
  }

  /**
   * 将 attr 处理之后，归一化的坐标值转换成画布坐标
   * @param mappingRecord
   */
  private convertPoint(mappingDatum: MappingDatum) {
    const { x, y } = mappingDatum;

    let rstX;
    let rstY;
    let obj;
    const { coordinate } = this.options;
    if (isArray(x) && isArray(y)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i += 1, j += 1) {
        obj = coordinate.convert({
          x: x[i],
          y: y[j],
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (isArray(y)) {
      rstY = [];
      for (let index = 0; index < y.length; index++) {
        const yVal = y[index];
        obj = coordinate.convert({
          x: x as number,
          y: yVal,
        });
        if (rstX && rstX !== obj.x) {
          if (!isArray(rstX)) {
            rstX = [rstX];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      }
    } else if (isArray(x)) {
      rstX = [];
      for (let index = 0; index < x.length; index++) {
        const xVal = x[index];
        obj = coordinate.convert({
          x: xVal,
          y,
        });
        if (rstY && rstY !== obj.y) {
          if (!isArray(rstY)) {
            rstY = [rstY];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      }
    } else {
      const point = coordinate.convert({
        x,
        y,
      });
      rstX = point.x;
      rstY = point.y;
    }
    mappingDatum.x = rstX;
    mappingDatum.y = rstY;
  }

  /**
   * 绘制：将数据最终转化成 G 的 Shape
   */
  public paint() {
    // 1. 生成关键点
    const dataArray = this.beforeMapping(this.beforeMappingData);

    const mappingDataArray = new Array(dataArray.length);
    for (let i = 0; i < dataArray.length; i++) {
      const mappingData = this.mapping(dataArray[i]);

      mappingDataArray[i] = mappingData;
    }

    // 生成/更新 Element
    this.createElements(mappingDataArray);
  }

  /**
   * 每一个分组一个 Element
   * 存在则更新，不存在则创建，最后全部更新到 elementsMap 中
   * @param mappingData
   */
  protected createElements(mappingDataArray: MappingDatum[][]): void {
    // 根据需要生成的 elements 和当前已有的 elements，做一个 diff
    // 1. 更新已有的
    // 2. 创建新增的
    // 3. 销毁删除的
    const newElementIds = [];
    const datumMap = new Map<string, MappingDatum>();

    for (let i = 0; i < mappingDataArray.length; i++) {
      const mappingData = mappingDataArray[i];
      for (let j = 0; j < mappingData.length; j++) {
        const mappingDatum = mappingData[j];
        const key = this.getElementId(mappingDatum);
        newElementIds.push(key);

        datumMap.set(key, mappingDatum);
      }
    }

    const { added, removed, updated } = diff(newElementIds, this.elementsMap);

    // 新增的
    added.forEach((key: string) => {
      const { container } = this.options;

      const mappingDatum = datumMap.get(key);

      const shapeInfo = this.getElementShapeInfo(mappingDatum); // 获取绘制图形的配置信息

      const element = new Element({
        id: key,
        geometry: this,
        container,
        animate: this.animateOption,
      });

      element.draw(shapeInfo); // 绘制

      this.elementsMap.set(key, element);
    });

    // 删除的
    removed.forEach((key: string) => {
      const el = this.elementsMap.get(key);
      el.destroy();

      this.elementsMap.delete(key);
    });

    //  todo 更新的
    updated.forEach((key: string) => {
      const el = this.elementsMap.get(key);

      const mappingDatum = datumMap.get(key);
      const shapeInfo = this.getElementShapeInfo(mappingDatum); // 获取绘制图形的配置信息

      el.update(shapeInfo);
    });
  }

  // 用于创建 Element 组件的配置
  protected getElementShapeInfo(mappingDatum: MappingDatum): ShapeInfo {
    const originData = mappingDatum[ORIGINAL_FIELD]; // 原始数据
    const cfg: ShapeInfo = {
      mappingData: mappingDatum, // 映射后的数据
      data: originData, // 原始数据
      // 通道数据
      x: mappingDatum.x,
      y: mappingDatum.y,
      color: mappingDatum.color,
      size: mappingDatum.size,
      custom: this.attriubteOptions.get('custom'),
      // 其他数据
      isInCircle: this.options.coordinate.isPolar,
    };

    let shapeName = mappingDatum.shape;
    if (!shapeName) {
      shapeName = this.defaultShapeType;
    }
    cfg.shape = shapeName;
    // 获取默认样式
    const theme = get(this.options.theme, ['geometries', this.type]);
    cfg.defaultStyle = get(theme, [shapeName, 'default'], {}).style;
    if (!cfg.defaultStyle) {
      cfg.defaultStyle = this.getDefaultStyle(theme);
    }

    const styleOption = this.attriubteOptions.get('style');
    if (styleOption) {
      cfg.style = this.getStyleCfg(styleOption, originData);
    }

    // todo 是否需要这个配置
    if (this.options.generatePoints) {
      cfg.points = mappingDatum.points;
      cfg.nextPoints = mappingDatum.nextPoints;
    }

    return cfg;
  }

  // 获取 style 配置
  // todo 为啥不直接用 attr 做？
  private getStyleCfg(styleOption: AttributeOption, originData: Datum) {
    const { fields = [], callback, value } = styleOption;
    if (value) {
      // 用户直接配置样式属性
      return value;
    }

    const params = fields.map((field) => {
      return originData[field];
    });

    return callback(...params);
  }

  /**
   * 不同的 geometry 有不同的 id 规则
   * @param mappingDatum
   */
  protected getElementId(mappingDatum: MappingDatum | MappingDatum[]): string {
    const originalData = mappingDatum[ORIGINAL_FIELD];
    // todo 不同的 element id 生成逻辑
    const xScale = this.getXScale();
    const yScale = this.getYScale();

    return `${originalData[xScale.getField()]}-${originalData[yScale.getField()]}`;
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
   * 样式通道：style
   */
  public style(fields: string, value: any) {
    this.setAttributeOption('style', fields, value);

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
   *
   * geometry.custom({
   *   type: 'custom',
   * });
   */
  public custom(value: any) {
    this.setAttributeOption('custom', null, value);

    return this;
  }

  /**
   * geometry.adjust([
   *   { type: 'stack' },
   *   { type: 'dodge', dodgeBy: 'x' },
   * ]);
   */
  public adjust(adjustOptions: AdjustOption[]) {
    this.adjustOptions = adjustOptions;

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
   * 获得所有属性映射中的字段，这些字段都会被创建 scale
   */
  public getFields(): string[] {
    return this.getUniqFieldsByAttrKeys(ALL_ATTR_KEYS);
  }

  /**
   * 获取所有映射中的分组字段
   */
  public getGroupFields() {
    return this.getUniqFieldsByAttrKeys(GROUP_ATTR_KEYS);
  }

  private getUniqFieldsByAttrKeys(keys: AttributeKey[]) {
    const fields = [];

    // 去重，且考虑性能
    const uniqMap = new Map<string, boolean>();

    for (let i = 0, length = keys.length; i < length; i++) {
      const attrKey = keys[i];
      // 获取所有通道中的 fields，谨防空值
      const attrFields = this.attriubteOptions.get(attrKey)?.fields || [];

      for (let j = 0; j < attrFields.length; j++) {
        const f = attrFields[j];

        if (!uniqMap.has(f)) {
          fields.push(f);
          uniqMap.set(f, true);
        }
      }
    }
    return fields;
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
    const { scales } = attr;
    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i];
      const field = scale.getField();
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
  public getElements(): Element[] {
    return Array.from(this.elementsMap.values());
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
    return this.getElements().filter((element) => {
      return condition(element);
    });
  }

  /**
   * 获取 adjust 实例
   */
  public getAdjust(type: string): Adjust {
    return this.adjusts?.get(type);
  }

  /**
   * 获取坐标系实例
   */
  public getCoordinate() {
    return this.options.coordinate;
  }

  /**
   * 获取某个字段的 scale 定义
   * @param field
   * @returns
   */
  public getScale(field: string): ScaleDef {
    return this.options.scales.get(field);
  }

  /** 获取 x 轴对应的 scale 实例。 */
  public getXScale(): ScaleDef {
    return this.options.scales.get(this.getXYFields()[0]);
  }

  /** 获取 y 轴对应的 scale 实例。 */
  public getYScale(): ScaleDef {
    return this.options.scales.get(this.getXYFields()[1]);
  }

  /** 获取渲染信息的 API，原 factory 中的内容，子 geometry 需要对其进行重写    ************************************************* */
  /**
   * 获取 shape 绘制需要的关键点
   * @param shapeType shape 类型
   * @param shapePoint 每条数据映射后的坐标点以及 size 数值
   * @returns 图形关键点信息
   */
  public getShapePoints(shapeType: string, shapePoint: ShapePoint) {
    const shapeRenderer = this.getShapeRenderer(shapeType);
    if (shapeRenderer.getPoints) {
      return shapeRenderer.getPoints(shapePoint);
    }

    return this.getDefaultPoints(shapePoint);
  }

  /**
   * 根据 shape 类型获取具体的 shape 实例
   * @param shapeType string shape 的类型
   * @returns
   */
  public getShapeRenderer(shapeType: string): Shape {
    const shapeRenderer = getShape(this.type, shapeType);

    // 如果以下，则更新
    // 1. 不存在
    // 2. 存在但是相同不匹配
    if (this.shapeRenderer?.shapeType !== shapeRenderer.shapeType) {
      this.shapeRenderer = shapeRenderer;
    }

    // 追加 coordinate 实例
    this.shapeRenderer.coordinate = this.options.coordinate;

    return this.shapeRenderer;
  }

  /**
   * 获取 shape 的默认关键点
   * @override
   */
  protected getDefaultPoints(shapePoint: ShapePoint): Point[] {
    return [];
  }

  /**
   * 获取 shape 的默认绘制样式 (内置的 shapeFactory 均有注册默认样式)
   */
  public getDefaultStyle(geometryTheme: PlainObject): PlainObject {
    return get(geometryTheme, [this.defaultShapeType, 'default', 'style'], {});
  }

  /**
   * 获取 shape 对应的缩略图配置信息。
   * @param shapeType shape 类型
   * @param color 颜色
   * @param isInPolar 是否在极坐标系下
   * @returns 返回缩略图 marker 配置。
   */
  public getShapeMarker(shapeType: string, markerCfg: ShapeMarkerCfg): ShapeMarkerAttrs {
    let shape = this.getShapeRenderer(shapeType);

    if (!shape.getMarker) {
      const defaultShapeType = this.defaultShapeType;
      shape = this.getShapeRenderer(defaultShapeType);
    }

    const theme = this.options.theme;
    const shapeStyle = get(theme, [shapeType, 'default'], {});
    const markerStyle = shape.getMarker(markerCfg);

    return deepMix({}, shapeStyle, markerStyle);
  }

  /**
   * 绘制 shape
   * @override
   * @param shapeType 绘制的 shape 类型
   * @param cfg 绘制 shape 需要的信息
   * @param element Element 实例
   * @returns
   */
  public drawShape(shapeType: string, cfg: ShapeInfo, container: Shape): Shape {
    const shape = this.getShapeRenderer(shapeType);
    return shape.draw(cfg, container);
  }
}
