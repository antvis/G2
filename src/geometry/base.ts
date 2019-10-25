import * as _ from '@antv/util';
import { createScaleByField, syncScale } from '../util/scale';
import Element from './element';
import { getShapeFactory } from './shape/base';
import { parseFields } from './util/parse-fields';

import { Adjust, getAdjust as getAdjustClass } from '@antv/adjust';
import { Attribute, getAttribute as getAttributeClass } from '@antv/attr';
import { FIELD_ORIGIN, GROUP_ATTRS } from '../constant';
import { Coordinate, IGroup, Scale } from '../dependents';
import {
  AdjustType,
  AnimateOption,
  Data,
  Datum,
  LooseObject,
  Point,
  ScaleOption,
  ShapeFactory,
  ShapeModel,
  ShapePoint,
} from '../interface';
import {
  AdjustOption,
  AttributeOption,
  ColorAttrCallback,
  ShapeAttrCallback,
  SizeAttrCallback,
  StyleCallback,
  StyleOption,
  TooltipCallback,
  TooltipOption,
} from './interface';

interface AttributeInstanceCfg {
  fields?: string[];
  callback?: (...args) => any;
  values?: string[] | number[];
  scales?: Scale[];
}

interface AdjustInstanceCfg {
  type: AdjustType;
  adjustNames?: string[];
  xField?: string;
  yField?: string;

  dodgeBy?: string;
  marginRatio?: number;
  dodgeRatio?: number;

  size?: number;
  height?: number;
  reverseOrder?: boolean;
}

interface MappedRecord {
  /** 原始数据 */
  _origin: Datum;
  /** 关键点坐标集合 */
  points?: Point[];
  /** 下一个 shape 的关键点坐标集合 */
  nextPoints?: Point;
  x?: number[] | number;
  y?: number[] | number;
  color?: string;
  shape?: string;
  size?: number;
}

export interface GeometryCfg {
  container: IGroup;
  coordinate?: Coordinate;
  data?: Data;
  scaleDefs?: ScaleOption;
  sortable?: boolean;
  visible?: boolean;
  theme?: LooseObject;
  scales?: Record<string, Scale>;
}

/**
 * Create a new Geometry
 * @class
 */
export default class Geometry {
  /** Geometry 类型 */
  public readonly type: string = 'base';
  /** Geometry 对应的 shapeFactory 类型 */
  public readonly shapeType: string;

  // 创建 Geometry 对象可传入的属性
  /** 坐标系对象 */
  public coordinate: Coordinate;
  /** data 数据 */
  public data: Data;
  /** 图形容器 */
  public readonly container: IGroup;
  /** scale 配置 */
  public scaleDefs: ScaleOption;
  /** 是否对数据进行排序 */
  public sortable: boolean;
  /** element 是否可见 */
  public visible: boolean;
  /** 配置主题 */
  public theme: LooseObject;
  /** scale·实例集合 */
  public scales: Record<string, Scale>;

  // 计算生成的属性
  /** 图形属性对象 */
  public attributes: Record<string, Attribute> = {};
  /** Element 实例集合 */
  public elements: Element[] = [];
  /** 分组、数字化、adjust 后的数据 */
  public dataArray: Data[];

  // 配置项属性存储
  /** 图形属性映射配置 */
  protected attributeOption: Record<string, AttributeOption> = {};
  /** tooltip 配置项 */
  protected tooltipOption: TooltipOption | boolean;
  /** adjust 配置项 */
  protected adjustOption: AdjustOption[];
  /** style 配置项 */
  protected styleOption: StyleOption;
  /** label 配置项 */
  protected labelOption;
  /** animate 配置项 */
  protected animateOption: AnimateOption | boolean = true;
  protected shapeFactory: ShapeFactory;
  protected elementsMap: Record<string, Element> = {};
  protected lastElementsMap: Record<string, Element> = {};
  /** 是否生成多个点来绘制图形 */
  protected generatePoints: boolean = false;

  private adjusts: Record<string, Adjust> = {};

  constructor(cfg: GeometryCfg) {
    const { container, coordinate, data, scaleDefs = {}, sortable = false, visible = true, theme, scales = {} } = cfg;

    this.container = container;
    this.coordinate = coordinate;
    this.data = data;
    this.scaleDefs = scaleDefs;
    this.sortable = sortable;
    this.visible = visible;
    this.theme = theme;
    this.scales = scales;
  }

  /**
   * 位置通道的映射配置
   * @param cfg 配置项
   */
  public position(cfg: string | AttributeOption): Geometry {
    if (_.isString(cfg)) {
      _.set(this.attributeOption, 'position', {
        fields: parseFields(cfg),
      });
    } else {
      _.set(this.attributeOption, 'position', cfg);
    }

    return this;
  }

  /**
   * 颜色通道的映射配置
   * @param cfg 颜色通道的映射规则
   */
  public color(field: AttributeOption): Geometry;
  public color(field: string, cfg?: string[] | ColorAttrCallback): Geometry;
  public color(field: AttributeOption | string, cfg?: string[] | ColorAttrCallback): Geometry {
    this.createAttrOption('color', field, cfg);

    return this;
  }

  /**
   * 形状通道的映射配置
   * @param cfg 形状通道的映射规则
   */
  public shape(field: AttributeOption): Geometry;
  public shape(field: string, cfg?: string[] | ShapeAttrCallback): Geometry;
  public shape(field: AttributeOption | string, cfg?: string[] | ShapeAttrCallback): Geometry {
    this.createAttrOption('shape', field, cfg);

    return this;
  }

  /**
   * 大小通道的映射配置
   * @param cfg 大小通道的映射规则
   */
  public size(field: AttributeOption): Geometry;
  public size(field: number | string, cfg?: [number, number] | SizeAttrCallback): Geometry;
  public size(field: AttributeOption | number | string, cfg?: [number, number] | SizeAttrCallback): Geometry {
    this.createAttrOption('size', field, cfg);

    return this;
  }

  /**
   * Adjust 数据调整配置
   * @param cfg 数据调整配置项
   */
  public adjust(adjustCfg: string | string[] | AdjustOption | AdjustOption[]): Geometry {
    let adjusts: any = adjustCfg;
    if (_.isString(adjustCfg) || _.isPlainObject(adjustCfg)) {
      adjusts = [adjustCfg];
    }
    _.each(adjusts, (adjust, index) => {
      if (!_.isObject(adjust)) {
        adjusts[index] = { type: adjust };
      }
    });

    this.adjustOption = adjusts;
    return this;
  }

  /**
   * style 图形样式属性配置
   * @param cfg 图形样式配置
   */
  public style(field: StyleOption | LooseObject): Geometry;
  public style(field: string, styleFunc: StyleCallback): Geometry;
  public style(field: StyleOption | LooseObject | string, styleFunc?: StyleCallback): Geometry {
    if (_.isString(field)) {
      const fields = parseFields(field);
      this.styleOption = {
        fields,
        callback: styleFunc,
      };
    } else {
      const { fields, callback, cfg } = field as StyleOption;
      if (fields || callback || cfg) {
        this.styleOption = field;
      } else {
        this.styleOption = {
          cfg: field,
        };
      }
    }

    return this;
  }

  public tooltip(field: TooltipOption | boolean): Geometry;
  public tooltip(field: string, cfg?: TooltipCallback): Geometry;
  public tooltip(field: TooltipOption | boolean | string, cfg?: TooltipCallback): Geometry {
    if (_.isString(field)) {
      const fields = parseFields(field);
      this.tooltipOption = {
        fields,
        callback: cfg,
      };
    } else {
      this.tooltipOption = field;
    }

    return this;
  }

  public animate(cfg: AnimateOption | boolean): Geometry {
    this.animateOption = cfg;
    return this;
  }

  /**
   * TODO: label() 如何实现
   */
  public label() {}

  public init() {
    // TODO: @simaq 是否可以移除设置矩阵这一步？
    // 需要修改 @antv/coord 模块，将点与当前矩阵相乘
    const coordinate = this.coordinate;
    const container = this.container;
    container.setMatrix(coordinate.matrix);

    this.initAttributes(); // 创建图形属性

    // 为 tooltip 的字段创建对应的 scale 实例
    const tooltipOption = this.tooltipOption;
    const tooltipFields = _.get(tooltipOption, 'fields');
    if (tooltipFields) {
      tooltipFields.forEach((field: string) => {
        this.createScale(field);
      });
    }
    // 数据加工：分组 -> 数字化 -> adjust
    this.processData(this.data);
  }
  /**
   * Updates data
   * @param data
   */
  public updateData(data: Data) {
    this.data = data;

    // 更新 scale
    this.updateScales();
    // 数据加工：分组 -> 数字化 -> adjust
    this.processData(data);
  }

  /** 进行数据到图形空间的映射同时绘制图形 */
  public paint() {
    this.elements = [];
    this.elementsMap = {};

    const dataArray = this.dataArray;
    this.beforeMapping(dataArray);

    const mappedArray = [];
    for (const eachGroup of dataArray) {
      const mappedData = this.mapping(eachGroup);
      mappedArray.push(mappedData);
      this.createElements(mappedData);
    }

    // 添加 label
    // if (this.get('labelOptions')) {
    //   const labelController = this.get('labelController');
    //   const labels = labelController.addLabels(_.union(...mappedArray), shapeContainer.get('children'));
    //   this.set('labels', labels);
    // }

    this.afterMapping(mappedArray);

    // 销毁被删除的 elements
    _.each(this.lastElementsMap, (deletedElement: Element) => {
      deletedElement.destroy();
    });

    this.lastElementsMap = this.elementsMap;
  }

  /**
   * Clears geometry
   * @override
   */
  public clear() {
    const container = this.container;
    container.clear();

    // 属性恢复至出厂状态
    this.attributes = {};
    this.scales = {};
    this.elementsMap = {};
    this.lastElementsMap = {};
    this.elements = [];
    this.dataArray = null;
  }

  /**
   * destroy
   */
  public destroy() {
    this.clear();
    const container = this.container;
    container.remove(true);
  }

  public getGroupScales() {
    const scales = [];
    const attributes = this.attributes;
    _.each(attributes, (attr: Attribute) => {
      if (GROUP_ATTRS.includes(attr.type)) {
        const attrScales = attr.scales;
        _.each(attrScales, (scale: Scale) => {
          if (scale.isCategory && !scales.includes(scale)) {
            scales.push(scale);
          }
        });
      }
    });

    return scales;
  }

  public getAttribute(name: string): Attribute {
    return this.attributes[name];
  }

  public getXScale(): Scale {
    return this.getAttribute('position').scales[0];
  }

  public getYScale(): Scale {
    return this.getAttribute('position').scales[1];
  }

  public getLegendAttributes(): Attribute[] {
    const rst = [];
    _.each(this.attributes, (attr: Attribute) => {
      if (GROUP_ATTRS.includes(attr.type)) {
        rst.push(attr);
      }
    });
    return rst;
  }

  public getDefaultValue(attrName: string) {
    let value: any;
    const attr = this.getAttribute(attrName);
    if (attr && _.isEmpty(attr.scales)) {
      // 获取映射至常量的值
      value = attr.values[0];
    }
    return value;
  }

  public getAttrValues(attr: Attribute, record: Datum) {
    const scales = attr.scales;

    const params = _.map(scales, (scale: Scale) => {
      const field = scale.field;
      if (scale.type === 'identity') {
        return scale.values[0];
      }
      if (scale.isCategory) {
        return record[field]; // 数据有可能发生过 adjust
      }
      return record[field];
    });
    return attr.mapping(...params);
  }

  public getAdjust(adjustType: string) {
    return this.adjusts[adjustType];
  }

  protected updateScales() {
    const { scaleDefs, scales, data } = this;
    _.each(scales, (scale) => {
      const { type, field } = scale;
      if (type !== 'identity') {
        const newScale = createScaleByField(field, data, scaleDefs[field]);
        syncScale(scale, newScale);
      }
    });
  }

  /**
   * @protected
   * 根据数据获取图形的关键点数据
   * @param obj 数据对象
   */
  protected createShapePointsCfg(obj: Datum): ShapePoint {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const x = this.normalizeValues(obj[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this.normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined,
    };
  }

  protected createElement(record: Datum, groupIndex: number): Element {
    const originData = record[FIELD_ORIGIN];
    const { theme, container } = this;

    const shapeCfg = this.getDrawCfg(record); // 获取绘制图形的配置信息
    const shapeFactory = this.getShapeFactory();
    const shape = record.shape || shapeFactory.defaultShapeType;

    const element = new Element({
      data: originData,
      model: shapeCfg,
      shapeType: shape,
      theme: _.get(theme, this.shapeType, {}),
      shapeFactory,
      container,
    });

    return element;
  }

  protected getDrawCfg(obj): ShapeModel {
    const cfg: ShapeModel = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: this.coordinate.isPolar,
      data: obj[FIELD_ORIGIN],
      animate: this.animateOption,
    };

    const styleOption = this.styleOption;
    if (styleOption) {
      cfg.style = this.getStyleCfg(styleOption, obj[FIELD_ORIGIN]);
    }
    if (this.generatePoints) {
      cfg.points = obj.points;
      cfg.nextPoints = obj.nextPoints;
    }

    return cfg;
  }

  protected createElements(mappedArray: Data): Element[] {
    const { lastElementsMap, elementsMap, elements } = this;
    _.each(mappedArray, (record, i) => {
      const originData = record[FIELD_ORIGIN];
      const id = this.getElementId(originData);
      let result = lastElementsMap[id];
      if (!result) {
        // 创建新的 element
        result = this.createElement(record, i);
      } else {
        // element 已经创建
        const currentShapeCfg = this.getDrawCfg(record);
        const preShapeCfg = result.model;
        if (!_.isEqual(currentShapeCfg, preShapeCfg)) {
          // 通过绘制数据的变更来判断是否需要更新，因为用户有可能会修改图形属性映射
          result.update(currentShapeCfg); // 更新对应的 element
        }

        delete lastElementsMap[id];
      }
      elements.push(result);
      elementsMap[id] = result;
    });

    return elements;
  }

  protected getElementId(origin: object) {
    const type = this.type;
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const xField = xScale.field || 'x';
    const yField = yScale.field || 'y';
    const yVal = origin[yField];
    let xVal;
    if (xScale.type === 'identity') {
      xVal = xScale.values[0];
    } else {
      xVal = origin[xField];
    }

    let id: string;
    if (type === 'interval' || type === 'schema') {
      id = xVal;
    } else if (type === 'line' || type === 'area' || type === 'path') {
      id = type;
    } else {
      id = `${xVal}-${yVal}`;
    }

    const groupScales = this.getGroupScales();
    if (!_.isEmpty(groupScales)) {
      _.each(groupScales, (groupScale: Scale) => {
        const field = groupScale.field;
        if (groupScale.type !== 'identity') {
          id = `${id}-${origin[field]}`;
        }
      });
    }

    // 用户在进行 dodge 类型的 adjust 调整的时候设置了 dodgeBy 属性
    const dodgeAdjust = this.getAdjust('dodge');
    if (dodgeAdjust) {
      const dodgeBy = dodgeAdjust.dodgeBy;
      if (dodgeBy) {
        id = `${id}-${origin[dodgeBy]}`;
      }
    }

    return id;
  }

  // 获取 element 对应 shape 的工厂对象
  protected getShapeFactory() {
    let shapeFactory = this.shapeFactory;
    if (!shapeFactory) {
      const shapeType = this.shapeType;
      const coordinate = this.coordinate;
      shapeFactory = getShapeFactory(shapeType);
      shapeFactory.setCoordinate(coordinate);
      this.shapeFactory = shapeFactory;
    }

    return shapeFactory;
  }

  // 创建图形属性相关的配置项
  private createAttrOption(attrName: string, field: AttributeOption | string | number, cfg?) {
    if (!field || _.isObject(field)) {
      _.set(this.attributeOption, attrName, field);
    } else {
      const attrCfg: AttributeOption = {};
      if (_.isNumber(field)) {
        // size(3)
        attrCfg.values = [field];
      } else {
        attrCfg.fields = parseFields(field);
      }

      if (cfg) {
        if (_.isFunction(cfg)) {
          attrCfg.callback = cfg;
        } else {
          attrCfg.values = cfg;
        }
      }

      _.set(this.attributeOption, attrName, attrCfg);
    }
  }

  // 创建 scale 实例
  private createScale(field: string) {
    const scales = this.scales;
    let scale = scales[field];
    if (!scale) {
      const data = this.data;
      const scaleDefs = this.scaleDefs;
      scale = createScaleByField(field, data, scaleDefs[field]);
      scales[field] = scale;
    }

    return scale;
  }

  private initAttributes() {
    const { attributes, attributeOption, theme, shapeType, coordinate } = this;

    // 遍历每一个 attrOption，各自创建 Attribute 实例
    _.each(attributeOption, (option: AttributeOption, attrType: string) => {
      if (!option) {
        return;
      }
      const attrCfg: AttributeInstanceCfg = {
        ...option,
      };
      const { callback, values, fields = [] } = attrCfg;

      // 给每一个字段创建 scale
      const scales = _.map(fields, (field) => {
        return this.createScale(field);
      });

      // 特殊逻辑：饼图需要填充满整个空间
      if (coordinate.type === 'theta' && attrType === 'position' && scales.length > 1) {
        const yScale = scales[1];
        yScale.change({
          nice: false,
          min: 0,
          max: Math.max.apply(null, yScale.values),
        });
      }

      attrCfg.scales = scales;

      if (attrType !== 'position' && scales.length === 1 && scales[0].type === 'identity') {
        // 用户在图形通道上声明了常量字段 color('red'), size(5)
        attrCfg.values = scales[0].values;
      } else if (!callback && !values) {
        // 用户没有指定任何规则，则使用默认的映射规则
        if (attrType === 'size') {
          attrCfg.values = theme.sizes;
        } else if (attrType === 'shape') {
          attrCfg.values = theme.shapes[shapeType] || [];
        } else if (attrType === 'color') {
          attrCfg.values = theme.colors;
        }
      }
      const AttributeCtor = getAttributeClass(attrType);
      attributes[attrType] = new AttributeCtor(attrCfg);
    });
  }

  // 处理数据：分组 -> 数字化 -> adjust 调整
  private processData(data: Data) {
    let groupedArray = this.groupData(data); // 数据分组

    groupedArray = _.map(groupedArray, (subData: Data) => {
      const tempData = this.saveOrigin(subData); // 存储原始数据
      this.numeric(tempData); // 将分类数据转换成数字
      return tempData;
    });

    const dataArray = this.adjustData(groupedArray); // 进行 adjust 数据调整
    this.dataArray = dataArray;

    return dataArray;
  }

  // 调整数据
  private adjustData(dataArray: Data[]): Data[] {
    const adjustOption = this.adjustOption;
    let result = dataArray;
    if (adjustOption) {
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xField = xScale.field;
      const yField = yScale ? yScale.field : null;
      adjustOption.forEach((adjust: AdjustOption) => {
        const adjustCfg: AdjustInstanceCfg = {
          xField,
          yField,
          ...adjust,
        };
        const type = adjust.type;
        if (type === 'dodge') {
          const adjustNames = [];
          if (xScale.isCategory || xScale.type === 'identity') {
            adjustNames.push('x');
          } else if (!yScale) {
            adjustNames.push('y');
          } else {
            throw new Error('dodge is not support linear attribute, please use category attribute!');
          }
          adjustCfg.adjustNames = adjustNames;
          // 每个分组内每条柱子的宽度占比，用户不可指定，用户需要通过 columnWidthRatio 指定
          adjustCfg.dodgeRatio = this.theme.columnWidthRatio;
        } else if (type === 'stack') {
          const coordinate = this.coordinate;
          if (!yScale) {
            // 一维的情况下获取高度和默认size
            adjustCfg.height = coordinate.getHeight();
            const size = this.getDefaultValue('size') || 3;
            adjustCfg.size = size;
          }
          // 不进行 transpose 时，用户又没有设置这个参数时，默认从上向下
          if (!coordinate.isTransposed && _.isNil(adjustCfg.reverseOrder)) {
            adjustCfg.reverseOrder = true;
          }
        }
        const adjustCtor = getAdjustClass(type);
        const adjustInstance = new adjustCtor(adjustCfg);

        result = adjustInstance.process(result);
        if (type === 'stack' && yScale) {
          this.updateStackRange(yField, yScale, result);
        }

        this.adjusts[type] = adjustInstance;
      });
    }

    return result;
  }

  // 对数据进行分组
  private groupData(data: Data): Data[] {
    const groupScales = this.getGroupScales();
    const fields = groupScales.map((scale) => scale.field);

    return _.group(data, fields);
  }

  // 数据调整前保存原始数据
  private saveOrigin(data: Data): Data {
    return _.map(data, (origin: Datum) => {
      return {
        ...origin,
        [FIELD_ORIGIN]: origin, // 存入 origin 数据
      };
    });
  }

  // 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  private numeric(data: Data) {
    const positionAttr = this.getAttribute('position');
    const scales = positionAttr.scales;
    for (let j = 0, len = data.length; j < len; j += 1) {
      const obj = data[j];
      for (let i = 0; i < Math.min(2, scales.length); i += 1) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          obj[field] = scale.translate(obj[field]);
        }
      }
    }
  }

  // 更新发生层叠后的数据对应的度量范围
  private updateStackRange(field: string, scale: Scale, dataArray: Data[]) {
    const mergeArray = _.flatten(dataArray);
    let min = scale.min;
    let max = scale.max;
    for (const obj of mergeArray) {
      const tmpMin = Math.min.apply(null, obj[field]);
      const tmpMax = Math.max.apply(null, obj[field]);
      if (tmpMin < min) {
        min = tmpMin;
      }
      if (tmpMax > max) {
        max = tmpMax;
      }
    }
    if (min < scale.min || max > scale.max) {
      scale.change({
        min,
        max,
      });
    }
  }

  // 将数据映射至图形空间前的操作：排序以及关键点的生成
  private beforeMapping(dataArray: Data[]) {
    if (this.sortable) {
      const xScale = this.getXScale();
      const field = xScale.field;
      _.each(dataArray, (data) => {
        data.sort((v1: object, v2: object) => {
          return xScale.translate(v1[field]) - xScale.translate(v2[field]);
        });
      });
    }
    if (this.generatePoints) {
      // 需要生成关键点
      _.each(dataArray, (data) => {
        this.generateShapePoints(data);
      });

      dataArray.reduce((preData: Data, currentData: Data) => {
        preData[0].nextPoints = currentData[0].points;
        return currentData;
      }, dataArray[0]);
    }
  }

  // 映射完毕后，对最后的结果集进行排序，方便后续 tooltip 的数据查找
  private afterMapping(dataArray: Data[]) {
    if (!this.sortable) {
      this.sort(dataArray);
    }
    this.dataArray = dataArray;
  }

  // 生成 shape 的关键点
  private generateShapePoints(data: Data) {
    const shapeFactory = this.getShapeFactory();
    const shapeAttr = this.getAttribute('shape');
    for (const obj of data) {
      const cfg = this.createShapePointsCfg(obj);
      const shape = shapeAttr ? this.getAttrValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }

  // 将数据归一化
  private normalizeValues(values, scale) {
    let rst = [];
    if (_.isArray(values)) {
      rst = values.map((v) => scale.scale(v));
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  // 获取 Y 轴上的最小值
  private getYMinValue(): number {
    const yScale = this.getYScale();
    const { min, max } = yScale;
    let value: number;

    if (min >= 0) {
      value = min;
    } else if (max <= 0) {
      // 当值全位于负区间时，需要保证 ymin 在区域内，不可为 0
      value = max;
    } else {
      value = 0;
    }
    return value;
  }

  // 将数据映射至图形空间
  private mapping(data: Data) {
    const attributes = this.attributes;
    const mappedData = [];
    for (const record of data) {
      const newRecord: MappedRecord = {
        _origin: record[FIELD_ORIGIN],
        points: record.points,
        nextPoints: record.nextPoints,
      };
      for (const k in attributes) {
        if (attributes.hasOwnProperty(k)) {
          const attr = attributes[k];
          const names = attr.names;
          const values = this.getAttrValues(attr, record);
          if (names.length > 1) {
            // position 之类的生成多个字段的属性
            for (let j = 0; j < values.length; j += 1) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = _.isArray(val) && val.length === 1 ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            // values.length === 1 的判断是以下情况，获取用户设置的图形属性值
            // shape('a', ['dot', 'dash']), color('a', ['red', 'yellow'])
            newRecord[names[0]] = values.length === 1 ? values[0] : values;
          }
        }
      }

      this.convertPoint(newRecord); // 将 x、y 转换成画布坐标
      mappedData.push(newRecord);
    }

    return mappedData;
  }

  // 将归一化的坐标值转换成画布坐标
  private convertPoint(mappedRecord: MappedRecord) {
    const { x, y } = mappedRecord;
    if (_.isNil(x) || _.isNil(y)) {
      return;
    }

    let rstX;
    let rstY;
    let obj;
    const coordinate = this.coordinate;
    if (_.isArray(y) && _.isArray(x)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i += 1, j += 1) {
        obj = coordinate.convertPoint({
          x: x[i],
          y: y[j],
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (_.isArray(y)) {
      rstY = [];
      y.forEach((yVal) => {
        obj = coordinate.convertPoint({
          x: x as number,
          y: yVal,
        });
        if (rstX && rstX !== obj.x) {
          if (!_.isArray(rstX)) {
            rstX = [rstX];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      });
    } else if (_.isArray(x)) {
      rstX = [];
      x.forEach((xVal) => {
        obj = coordinate.convertPoint({
          x: xVal,
          y: y as number,
        });
        if (rstY && rstY !== obj.y) {
          if (!_.isArray(rstY)) {
            rstY = [rstY];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      });
    } else {
      const point = coordinate.convertPoint({
        x,
        y,
      });
      rstX = point.x;
      rstY = point.y;
    }
    mappedRecord.x = rstX;
    mappedRecord.y = rstY;
  }

  // 对数据进行排序
  private sort(mappedArray: object[][]) {
    const xScale = this.getXScale();
    const xField = xScale.field;
    _.each(mappedArray, (itemArr: object[]) => {
      itemArr.sort((obj1: object, obj2: object) => {
        return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
      });
    });
  }

  // 获取 style 配置
  private getStyleCfg(styleOption: StyleOption, origin: object) {
    const { fields = [], callback, cfg } = styleOption;
    if (cfg) {
      // 用户直接配置样式属性
      return cfg;
    }

    const params = fields.map((field) => {
      return origin[field];
    });

    return callback(...params);
  }
}
