import * as Util from '@antv/util';
import ScaleUtil from '../util/scale';
import Element from './element';
import { getShapeFactory } from './shape';
import { parseFields } from './util/parse-fields';

import { getAdjust } from '@antv/adjust';
import { Attribute, getAttribute } from '@antv/attr';
import { Coord, Scale } from '../dependents';
import { PointObject, ScaleOption, ShapeDrawCFG } from '../interface';

import { Group } from '@antv/g';

const GROUP_ATTRS = ['color', 'shape', 'size'];
const FIELD_ORIGIN = '_origin';

type ColorAttrCallback = (...args) => string;
type ShapeAttrCallback = (...args) => string | any[];
type SizeAttrCallback = (...args) => number;
type TooltipCallback = (...args) => object;
type StyleCallback = (...args) => object;

interface AttrsMap {
  [key: string]: Attribute;
}

interface ScalesMap {
  [key: string]: Scale;
}

interface ElementsMap {
  [key: string]: Element;
}

interface AttributeOption {
  /** 映射的属性字段 */
  fields?: string[];
  /** 回调函数 */
  callback?: (...args) => any;
  /** 指定常量映射规则 */
  values?: any[];
}

interface AdjustOption {
  /** 调整类型 */
  type: string;
  /**
   * type 为 'dodge' 时生效，数值范围为 0 至 1，用于调整分组中各个柱子的间距
   */
  marginRatio?: number;
  /**
   * type 为 'stack' 时生效，控制层叠的顺序，默认是 true
   */
  reverseOrder?: boolean;
  /**
   * type 为 'dodge' 时生效, 按照声明的字段进行分组
   */
  dodgeBy?: string;
}

interface StyleOption {
  /** 映射的字段 */
  fields?: string[];
  /** 回调函数 */
  callback?: (...args) => object;
  /** 图形样式配置 */
  cfg?: object;
}

interface TooltipOption {
  /** 参与映射的字段 */
  fields: string[];
  /** 回调函数 */
  callback?: (...args) => object;
}

interface Attributes {
  [key: string]: AttributeOption;
}

interface AttrInstanceCfg {
  fields?: string[];
  callback?: (...args) => any;
  values?: string[] | number[];
  scales?: Scale[];
}

interface AdjustInstanceCfg {
  type: string;
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
  _origin: object;
  /** 关键点坐标集合 */
  points?: PointObject[];
  /** 下一个 shape 的关键点坐标集合 */
  nextPoints?: PointObject;
  x?: number[] | number;
  y?: number[] | number;
  color?: string;
  shape?: string;
  size?: number;
}

export default class Geometry {
  /** Geometry 类型 */
  public type: string = 'base';
  /** Geometry 对应的 shape 类型 */
  public shapeType: string;
  /** 图形属性对象 */
  public attrs: AttrsMap = {};
  /** scale·实例集合 */
  public scales: ScalesMap = {};
  /** Element 实例集合 */
  public elements: Element[] = [];
  /** elements 同数据的映射表 */
  public elementsMap: ElementsMap = {};

  /** 坐标系对象 */
  public coord: Coord = null;
  /** data 数据 */
  public data: object[] = null;
  /** 图形容器 */
  public container: Group = null;
  /** scale 配置 */
  public scaleDefs: ScaleOption = {};

  /** 是否生成多个点来绘制图形 */
  public generatePoints: boolean = false;
  /** 是否对数据进行排序 */
  public sortable: boolean = false;
  /** 是否执行动画 */
  public animate: boolean = true;
  /** element 是否可见 */
  public visible: boolean = true;
  /** todo 配置主题 */
  public theme: any = null;

  /** 图形属性映射配置 */
  public attrOption: Attributes = {};
  /** TODO: tooltip 配置项 */
  public tooltipOption = null;
  /** TODO: adjust 配置项 */
  public adjustOption = null;
  /** TODO: style 配置项 */
  public styleOption = null;
  /** TODO: label 配置项 */
  public labelOption = null;
  /** TODO: animate 配置项 */
  public animateOption = null;

  /** 分组、数字化、adjust 后的数据 */
  public dataArray;
  public groupScales: Scale[];
  public shapeFactory;

  constructor(cfg) {
    Util.mix(this, cfg);
  }

  /**
   * 位置通道的映射配置
   * @param cfg 配置项
   */
  public position(cfg: string | AttributeOption): Geometry {
    if (Util.isString(cfg)) {
      this._setAttrOptions('position', {
        fields: parseFields(cfg),
      });
    } else {
      this._setAttrOptions('position', cfg);
    }

    return this;
  }

  /**
   * 颜色通道的映射配置
   * @param cfg 颜色通道的映射规则
   */
  public color(field: AttributeOption | string, cfg?: string[] | ColorAttrCallback): Geometry {
    this._createAttrOption('color', field, cfg);

    return this;
  }

  /**
   * 形状通道的映射配置
   * @param cfg 形状通道的映射规则
   */
  public shape(field: AttributeOption | string, cfg?: string[] | ShapeAttrCallback): Geometry {
    this._createAttrOption('shape', field, cfg);

    return this;
  }

  /**
   * TODO：如何支持接收相对值以及绝对值
   * 大小通道的映射配置
   * @param cfg 大小通道的映射规则
   */
  public size(field: AttributeOption | number | string, cfg?: [number, number] | SizeAttrCallback): Geometry {
    this._createAttrOption('size', field, cfg);

    return this;
  }

  /**
   * Adjust 数据调整配置
   * @param cfg 数据调整配置项
   */
  public adjust(adjustCfg: string | string[] | AdjustOption | AdjustOption[]): Geometry {
    let adjusts: any = adjustCfg;
    if (Util.isString(adjustCfg) || Util.isPlainObject(adjustCfg)) {
      adjusts = [adjustCfg];
    }
    Util.each(adjusts, (adjust, index) => {
      if (!Util.isObject(adjust)) {
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
  public style(field: StyleOption | object | string, styleFunc?: StyleCallback): Geometry {
    if (Util.isString(field)) {
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

  public tooltip(field: TooltipOption | boolean | string, cfg?: TooltipCallback): Geometry {
    if (Util.isString(field)) {
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

  /** 初始化 Geometry */
  public init() {
    const coord = this.coord;
    const container = this.container;
    container.setMatrix(coord.matrix); // TODO：是否可以移除这步设置

    this._initAttrs(); // 创建图形属性

    const tooltipOption = this.tooltipOption;
    const tooltipFields = Util.get(tooltipOption, 'fields');
    if (tooltipFields) {
      tooltipFields.forEach((field: string) => {
        this._createScale(field);
      });
    }

    const data = this.data;
    let dataArray = this._processData(data);
    dataArray = this._adjustData(dataArray);
    this.dataArray = dataArray;
  }

  /** 进行数据到图形空间的映射同时绘制图形 */
  public paint() {
    const coord = this.coord;
    const dataArray = this.dataArray;
    const mappedArray = [];

    const shapeFactory = this._getShapeFactory();
    shapeFactory.setCoord(coord);

    this._beforeMapping(dataArray);
    for (let i = 0, len = dataArray.length; i < len; i += 1) {
      let data = dataArray[i];
      data = this._mapping(data);
      mappedArray.push(data);
      this.draw(data, shapeFactory, i);
    }

    // 添加 label
    // if (this.get('labelOptions')) {
    //   const labelController = this.get('labelController');
    //   const labels = labelController.addLabels(Util.union(...mappedArray), shapeContainer.get('children'));
    //   this.set('labels', labels);
    // }

    if (!this.sortable) {
      this._sort(mappedArray);
    }
    this.dataArray = mappedArray;
  }

  /** 更新数据 */
  public update(data) {
    this.data = data;

    // 更新 scale
    const scales = this.scales;
    const scaleDefs = this.scaleDefs;
    Util.each(scales, (scale) => {
      const { type, field } = scale;
      if (type !== 'identity') {
        const newScale = ScaleUtil.createScale(field, data, scaleDefs[field]);
        ScaleUtil.syncScale(scale, newScale);
      }
    });

    // 重新进行数据的加工
    let dataArray = this._processData(data);
    dataArray = this._adjustData(dataArray);

    this._beforeMapping(dataArray);
    const mappedArray = [];
    Util.each(dataArray, (everyData, i) => {
      const mappedResult = this._mapping(everyData);
      mappedArray.push(mappedResult);
      this.updateElements(mappedResult);
    });

    if (!this.sortable) {
      this._sort(mappedArray);
    }
    this.dataArray = mappedArray;
  }

  public getGroupScales() {
    let scales = this.groupScales;
    if (!scales) {
      scales = [];
      const attrs = this.attrs;
      Util.each(attrs, (attr: Attribute) => {
        if (GROUP_ATTRS.indexOf(attr.type) !== -1) {
          const attrScales = attr.scales;
          Util.each(attrScales, (scale: Scale) => {
            if (scale.isCategory && Util.indexOf(scales, scale) === -1) {
              scales.push(scale);
            }
          });
        }
      });

      this.groupScales = scales;
    }
    return scales;
  }

  public getAttr(name: string) {
    return this.attrs[name];
  }

  public getXScale(): Scale {
    return this.getAttr('position').scales[0];
  }

  public getYScale(): Scale {
    return this.getAttr('position').scales[1];
  }

  public getDefaultValue(attrName: string) {
    let value: any;
    const attr = this.getAttr(attrName);
    if (attr && Util.isEmpty(attr.scales)) {
      // 获取映射至常量的值
      value = attr.values[0];
    }
    return value;
  }

  public getAttrValues(attr: Attribute, record: object) {
    const scales = attr.scales;

    const params = Util.map(scales, (scale: Scale) => {
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

  /**
   * @protected
   * 根据数据获取图形的关键点数据
   * @param obj 数据对象
   */
  protected createShapePointsCfg(obj: any): object {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const x = this._normalizeValues(obj[xScale.field], xScale);
    let y; // 存在没有 y 的情况

    if (yScale) {
      y = this._normalizeValues(obj[yScale.field], yScale);
    } else {
      y = obj.y ? obj.y : 0.1;
    }

    return {
      x,
      y,
      y0: yScale ? yScale.scale(this._getYMinValue()) : undefined,
    };
  }

  protected draw(data: object[], shapeFactory, groupIndex: number) {
    Util.each(data, (record, index) => {
      this.drawPoint(record, shapeFactory, groupIndex + index);
    });
  }

  protected drawPoint(record: object, shapeFactory, groupIndex: number) {
    const originData = record[FIELD_ORIGIN];
    const geomType = this.type;
    const shapeType = this.shapeType;
    const theme = this.theme;

    const shapeCfg = this.getDrawCfg(record); // 获取绘制图形的配置信息
    const id = this._getElementId(originData);

    const element = new Element({
      id,
      data: originData,
      model: shapeCfg,
      shapeType,
      theme: Util.get(theme, `shape.${geomType}`, {}),
      shapeFactory,
    });

    this.elements.push(element);
    this.elementsMap[id] = element;
    this.container.add(element);
  }

  protected getDrawCfg(obj) {
    const cfg: ShapeDrawCFG = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: this.coord.isPolar,
    };

    const styleOption = this.styleOption;
    if (styleOption) {
      cfg.style = this._getStyleCfg(styleOption, obj[FIELD_ORIGIN]);
    }
    if (this.generatePoints) {
      cfg.points = obj.points;
      cfg.nextPoints = obj.nextPoints;
    }

    return cfg;
  }

  protected updateElements(mappedArray: object[]) {
    const elementsMap = this.elementsMap;
    const geomType = this.type;
    const shapeType = this.shapeType;
    const theme = this.theme;
    const shapeFactory = this.shapeFactory;

    const newMap = {};
    const newElements = [];
    Util.each(mappedArray, (record, i) => {
      const originData = record[FIELD_ORIGIN];
      const id = this._getElementId(originData);
      const result = elementsMap[id];
      if (!result) {
        // 创建新的 Element
        const shapeCfg = this.getDrawCfg(record); // 获取绘制图形的配置信息
        const element = new Element({
          id,
          data: originData,
          model: shapeCfg,
          shapeType,
          theme: Util.get(theme, `shape.${geomType}`, {}),
          shapeFactory,
        });
        newElements.push(element);
        newMap[id] = element;
      } else {
        // 发生更新的 Element
        if (originData !== result.getData()) {
          const shapeCfg = this.getDrawCfg(record); // 获取绘制图形的配置信息
          result.update(shapeCfg); // 更新对应的 element
        }
        newMap[id] = result;
        newElements.push(result);

        delete elementsMap[id];
      }
    });
    // 被删除的 element
    Util.each(elementsMap, (deletedElement, id) => {
      deletedElement.destroy();
    });

    this.elementsMap = newMap;
    this.elements = newElements;
  }

  // 存储用户设置的图形属性配置项
  private _setAttrOptions(name: string, cfg: AttributeOption) {
    const attrOption = this.attrOption;
    attrOption[name] = cfg;
  }

  // 创建图形属性相关的配置项
  private _createAttrOption(attrName: string, field: AttributeOption | string | number, cfg?) {
    if (Util.isObject(field)) {
      this._setAttrOptions(attrName, field);
    } else {
      const attrCfg: AttributeOption = {};
      if (Util.isNumber(field)) {
        // size(3)
        attrCfg.values = [field];
      } else {
        attrCfg.fields = parseFields(field);
      }

      if (cfg) {
        if (Util.isFunction(cfg)) {
          attrCfg.callback = cfg;
        } else {
          attrCfg.values = cfg;
        }
      }

      this._setAttrOptions(attrName, attrCfg);
    }
  }

  // 创建 scale 实例
  private _createScale(field: string) {
    const scales = this.scales;
    let scale = scales[field];
    if (!scale) {
      const data = this.data;
      const scaleDefs = this.scaleDefs;
      scale = ScaleUtil.createScale(field, data, scaleDefs[field]);
      scales[field] = scale;
    }

    return scale;
  }

  private _initAttrs() {
    const attrs = this.attrs;
    const attrOption = this.attrOption;
    const theme = this.theme;
    const geomType = this.type;

    // 遍历每一个 attrOption，各自创建 Attribute 实例
    Util.each(attrOption, (option: AttributeOption, attrType: string) => {
      const attrCfg: AttrInstanceCfg = {
        ...option,
      };
      const { callback, values, fields = [] } = attrCfg;

      // 给每一个字段创建 scale
      const scales = Util.map(fields, (field) => {
        return this._createScale(field);
      });

      attrCfg.scales = scales;

      if (
        Util.indexOf(['color', 'size', 'shape', 'opacity'], attrType) !== -1 &&
        scales.length === 1 &&
        scales[0].type === 'identity'
      ) {
        // 用户在图形通道上声明了常量字段 color('red'), size(5)
        attrCfg.values = scales[0].values;
      } else if (!callback && !values) {
        // 用户没有指定任何规则，则使用默认的映射规则
        if (attrType === 'size') {
          attrCfg.values = theme.sizes;
        } else if (attrType === 'shape') {
          attrCfg.values = theme.shapes[geomType] || [];
        } else if (attrType === 'color') {
          // TODO 需要优化
          attrCfg.values = theme.colors;
        }
      }
      const attrCtor = getAttribute(attrType);
      attrs[attrType] = new attrCtor(attrCfg);
    });
  }

  // 处理数据：分组、数字化
  private _processData(data: object[]) {
    const groupedArray = this._groupData(data);

    return Util.map(groupedArray, (subData: object[]) => {
      const tempData = this._saveOrigin(subData);
      this._numeric(tempData);
      return tempData;
    });
  }

  // 调整数据
  private _adjustData(dataArray: object[][]): object[][] {
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
          // TODO
          // adjustCfg.dodgeRatio = this.get('widthRatio').column;
        } else if (type === 'stack') {
          const coord = this.coord;
          if (!yScale) {
            // 一维的情况下获取高度和默认size
            adjustCfg.height = coord.getHeight();
            const size = this.getDefaultValue('size') || 3;
            adjustCfg.size = size;
          }
          // 不进行 transpose 时，用户又没有设置这个参数时，默认从上向下
          if (!coord.isTransposed && Util.isNil(adjustCfg.reverseOrder)) {
            adjustCfg.reverseOrder = true;
          }
        }
        const adjustCtor = getAdjust(type);
        const adjustInstance = new adjustCtor(adjustCfg);

        result = adjustInstance.process(result);
        if (type === 'stack' && yScale) {
          this._updateStackRange(yField, yScale, result);
        }
      });
    }

    return result;
  }

  // 对数据进行分组
  private _groupData(data: object[]): object[][] {
    const groupScales = this.getGroupScales();
    const fields = groupScales.map((scale) => scale.field);

    return Util.group(data, fields);
  }

  // 数据调整前保存原始数据
  private _saveOrigin(data: object[]): object[] {
    return Util.map(data, (origin: object) => {
      return {
        ...origin,
        [FIELD_ORIGIN]: origin, // 存入 origin 数据
      };
    });
  }

  // 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  private _numeric(data: object[]) {
    const positionAttr = this.getAttr('position');
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
  private _updateStackRange(field: string, scale: Scale, dataArray: object[][]) {
    const mergeArray = Util.flatten(dataArray);
    let min = scale.min;
    let max = scale.max;
    for (let i = 0, len = mergeArray.length; i < len; i += 1) {
      const obj = mergeArray[i];
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
  private _beforeMapping(dataArray: any[][]) {
    if (this.sortable) {
      const xScale = this.getXScale();
      const field = xScale.field;
      Util.each(dataArray, (data) => {
        data.sort((v1: object, v2: object) => {
          return xScale.translate(v1[field]) - xScale.translate(v2[field]); // TODO
        });
      });
    }
    if (this.generatePoints) {
      // 需要生成关键点
      Util.each(dataArray, (data) => {
        this._generatePoints(data);
      });
      Util.each(dataArray, (data, index) => {
        const nextData = dataArray[index + 1];
        if (nextData) {
          data[0].nextPoints = nextData[0].points;
        }
      });
    }
  }

  // 生成 shape 的关键点
  private _generatePoints(data: any[]) {
    const shapeFactory = this.shapeFactory;
    const shapeAttr = this.getAttr('shape');
    for (let i = 0, len = data.length; i < len; i += 1) {
      const obj = data[i];
      const cfg = this.createShapePointsCfg(obj);
      const shape = shapeAttr ? this.getAttrValues(shapeAttr, obj) : null;
      const points = shapeFactory.getShapePoints(shape, cfg);
      obj.points = points;
    }
  }

  // 将数据归一化
  private _normalizeValues(values, scale) {
    let rst = [];
    if (Util.isArray(values)) {
      for (let i = 0, len = values.length; i < len; i += 1) {
        const v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  // 获取 Y 轴上的最小值
  private _getYMinValue(): number {
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
  private _mapping(data: any[]) {
    const attrs = this.attrs;
    const mappedData = [];
    for (let i = 0, len = data.length; i < len; i += 1) {
      const record = data[i];
      const newRecord: MappedRecord = {
        _origin: record[FIELD_ORIGIN],
        points: record.points,
        nextPoints: record.nextPoints,
      };
      for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          const attr = attrs[k];
          const names = attr.names;
          const values = this.getAttrValues(attr, record);
          if (names.length > 1) {
            // position 之类的生成多个字段的属性
            for (let j = 0; j < values.length; j += 1) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = Util.isArray(val) && val.length === 1 ? val[0] : val; // 只有一个值时返回第一个属性值
            }
          } else {
            // newRecord[names[0]] = values.length === 1 ? values[0] : values;
            // FIXME: 目前只有 color 通道是受 attr 结果统一为数组的影响的，暂时这么调整
            if (values.length === 1 || names[0] === 'color') {
              newRecord[names[0]] = values[0];
            } else {
              newRecord[names[0]] = values;
            }
          }
        }
      }

      this._convertPoint(newRecord); // 将 x、y 转换成画布坐标
      mappedData.push(newRecord);
    }

    return mappedData;
  }

  // 将归一化的坐标值转换成画布坐标
  private _convertPoint(mappedRecord: MappedRecord) {
    const { x, y } = mappedRecord;
    if (Util.isNil(x) || Util.isNil(y)) {
      return;
    }

    let rstX;
    let rstY;
    let obj;
    const coord = this.coord;
    if (Util.isArray(y) && Util.isArray(x)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i += 1, j += 1) {
        obj = coord.convertPoint({
          x: x[i],
          y: y[j],
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (Util.isArray(y)) {
      rstY = [];
      y.forEach((yVal) => {
        obj = coord.convertPoint({
          x,
          y: yVal,
        });
        if (rstX && rstX !== obj.x) {
          if (!Util.isArray(rstX)) {
            rstX = [rstX];
          }
          rstX.push(obj.x);
        } else {
          rstX = obj.x;
        }
        rstY.push(obj.y);
      });
    } else if (Util.isArray(x)) {
      rstX = [];
      x.forEach((xVal) => {
        obj = coord.convertPoint({
          x: xVal,
          y,
        });
        if (rstY && rstY !== obj.y) {
          if (!Util.isArray(rstY)) {
            rstY = [rstY];
          }
          rstY.push(obj.y);
        } else {
          rstY = obj.y;
        }
        rstX.push(obj.x);
      });
    } else {
      const point = coord.convertPoint({
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
  private _sort(mappedArray: object[][]) {
    const xScale = this.getXScale();
    const xField = xScale.field;
    Util.each(mappedArray, (itemArr: object[]) => {
      itemArr.sort((obj1: object, obj2: object) => {
        return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
      });
    });
  }

  private _getElementId(origin: object) {
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
    if (!Util.isEmpty(groupScales)) {
      Util.each(groupScales, (groupScale: Scale) => {
        const field = groupScale.field;
        if (groupScale.type !== 'identity') {
          id = `${id}-${origin[field]}`;
        }
      });
    }
    return id;
  }

  // 获取 style 配置
  private _getStyleCfg(styleOption: StyleOption, origin: object) {
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

  // 获取 element 对应 shape 的工厂对象
  private _getShapeFactory() {
    let shapeFactory = this.shapeFactory;
    if (!shapeFactory) {
      const shapeType = this.shapeType;
      shapeFactory = getShapeFactory(shapeType);
      this.shapeFactory = shapeFactory;
    }

    return shapeFactory;
  }
}
