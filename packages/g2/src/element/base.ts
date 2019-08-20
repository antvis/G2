/**
 * @description Element 基类
 */
import { Group, Shape } from '@antv/g';
import { getAttribute, Attribute, getAdjust, Scale } from '../dependents';
import * as _ from '@antv/util';
import { getShapeFactory } from './shape/base';
import { DataPointType, PointObject, ShapeDrawCFG, AdjustCfg } from '../interface';
import Base from '../base';
import Global from '../global';
import TooltipController from './controller/tooltip';
import LabelController from './controller/label';
import StateController from './controller/state';
import { parseFields } from './util/parse-fields';

const GROUP_ATTRS = [ 'color', 'shape', 'size' ];
export const FIELD_ORIGIN = '_origin';

export interface AttributeCfg {
  fields?: string[]; // 映射的属性字段
  callback?: Function; // 回调函数
  values?: any[]; // 指定常量映射规则，TODO：会不会 range 参数更合适？
}

export interface StyleCfg {
  fields?: string[];
  callback?: Function;
  cfg?: DataPointType; // 直接配置图形属性
}

interface TooltipCfg {
  fields: string[]; // 映射的字段名集合
  callback?: Function; // 回调函数
}

type callback = (data: DataPointType, i: number) => string;
export interface LabelCfg {
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  textStyle?: DataPointType;
  autoRotate?: boolean;
  rotate?: number; // autoRotate 为 false 才生效
  labelLine?: boolean | DataPointType;
  content?: string | callback;
  useHtml?: boolean;
  htmlTemplate?: string | callback;
  type?: 'default' | 'scatter' | 'treemap' | 'map';
  position?: 'top' | 'bottom' | 'middle' | 'left' | 'right';
  labelEmit?: boolean;
  labelHeight?: number;
}
type LabelCfgCallback = (...args: string[]) => (LabelCfg | null);
export interface LabelOptions {
  fields: string[];
  /** label类型 */
  type?: string;
  callback?: LabelCfgCallback;
}
interface AttrInstanceCfg {
  fields?: string[];
  callback?: Function;
  values?: string[] | number[];
  scales?: DataPointType;
}

// color 通道的回调函数定义
type ColorAttrCallback = (...args) => string;
type ShapeAttrCallback = (...args) => string | any[];
type SizeAttrCallback = (...args) => number;
type OpacityAttrCallback = (...args) => number;
type TooltipCallback = (...args) => DataPointType;
type StyleCallback = (...args) => DataPointType;

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

// 动画
type AnimateParamCallback = (index: number, id?: string) => number;
type AnimateEasingCallback = (index: number, id?: string) => Function;
type Easings = 'easeLinear' | 'easeQuad' | 'easeQuadIn' | 'easeQuadOut' | 'easeQuadInOut' |
  'easeCubic' | 'easeCubicIn' | 'easeCubicOut' | 'easeCubicInOut' |
  'easePoly' | 'easePolyIn' | 'easePolyOut' | 'easePolyInOut' |
  'easeSin' | 'easeSinIn' | 'easeSinOut' | 'easeSinInOut' |
  'easeExp' | 'easeExpIn' | 'easeExpOut' | 'easeExpInOut' |
  'easeCircle' | 'easeCircleIn' | 'easeCircleOut' | 'easeCircleInOut' |
  'easeBounce' | 'easeBounceIn' | 'easeBounceOut' | 'easeBounceInOut' |
  'easeBack' | 'easeBackIn' | 'easeBackOut' | 'easeBackInOut' |
  'easeElastic' | 'easeElasticIn' | 'easeElasticOut' | 'easeElasticInOut';
type AppearAnimation = 'clipIn' | 'zoomIn' | 'pathIn' | 'scaleInY' |
  'scaleInX' | 'fanIn' | 'fadeIn' | 'groupWaveIn' | 'groupScaleInX' |
  'groupScaleInY' | 'groupScaleInXY';
type EnterAnimation = 'clipIn' | 'zoomIn' | 'pathIn' | 'scaleInY' |
  'scaleInX' | 'fanIn' | 'fadeIn';
type LeaveAnimation = 'lineWidthOut' | 'zoomOut' | 'pathOut' | 'fadeOut' | 'fadeIn';
type UpdateAnimation = 'fadeIn' | 'fanIn';
interface AnimateActionCfg {
  easing?: Easings | AnimateEasingCallback; // 动画缓动函数
  delay?: number | AnimateParamCallback; // 动画延迟执行时间，单位 ms
  duration?: number | AnimateParamCallback; // 动画执行时间，单位 ms
  callback?: Function; // 动画结束后执行的回调函数
}
interface AppearAnimateCfg extends AnimateActionCfg{
  animation?: AppearAnimation | string; // 定义动画执行函数
}
interface EnterAnimateCfg extends AnimateActionCfg {
  animation?: EnterAnimation | string; // 定义动画执行函数
}
interface UpdateAnimateCfg extends AnimateActionCfg {
  animation?: UpdateAnimation | string; // 定义动画执行函数
}
interface LeaveAnimateCfg extends AnimateActionCfg {
  animation?: LeaveAnimation | string; // // 定义动画执行函数
}
interface AnimateCfg {
  appear?: AppearAnimateCfg | false; // 定义初入场动画配置，false 表示关闭
  update?: UpdateAnimateCfg | false; // 定义更新动画配置，false 表示关闭
  leave?: LeaveAnimateCfg | false; // 定义出场动画配置，false 表示关闭
  enter?: EnterAnimateCfg | false; // 定义新入场动画配置，false 表示关闭
}

interface MappingResult {
  _origin: DataPointType; // 存放原始数据
  points?: PointObject[]; // 关键点信息
  nextPoints?: PointObject; // 下一个 shape 关键点的信息
  x?: number[] | number;
  y?: number[] | number;
  color?: string;
  opacity?: number;
  shape?: string;
  size?: number;
}

export interface ElementConstructor {
  new(cfg: any): Element;
}

export default class Element extends Base {
  constructor(cfg: DataPointType) {
    super({
      id: null, // 标记 id，用于区分执行动画
      type: 'base', // Element 类型
      shapeType: null, // Element 对应 shape 的类型
      coord: null, // 坐标系对象
      attrs: {}, // 属性映射集合
      data: [], // 数据
      scales: {}, // scales 集合
      attrOptions: {}, // 图形属性配置项
      view: null, // Element 所属的 view
      canvas: null, // 画布对象
      container: null, // 绘图容器
      shapeContainer: null, // shape 图形元素容器

      generatePoints: false, // 是否生成多个点来绘制图形
      sortable: false, // 数据是否进行排序
      animate: true, // 是否执行动画，由 element 对应的 view 实例透传过来
      visible: true, // Element 是否可见
      shareTooltip: true, // 默认会合并 tooltip

      activeOptions: null, // shape 在 active 状态下样式配置
      inactiveOptions: null, // shape 在 inactive 状态下的样式配置
      selectedOptions: null, // shape 在 selected 状态下的样式配置
      labelOptions: null, // label 配置项
      tooltipOptions: null, // tooltip 配置项
      adjustOptions: null, // 数据调整类型
      styleOptions: null, // 样式配置项
      statOptions: null, // 统计函数配置项
      animateOptions: null, // element 自身动画相关的配置项
      theme: null, // view 实例级别的主题配置
      widthRatio: Global.widthRatio,
      ...cfg,
    });

    // 设置 theme
    const theme = this.get('theme') || Global.theme;
    this.set('theme', theme);

    // 初始化容器，container 容器在 view 中添加 element 的时候创建
    this.get('container') && this._initContainer();
    // 初始化 Element 的辅助控制器对象
    this._initController();
  }

  /**
   * 位置通道的映射配置
   * @param cfg 配置项
   */
  public position(cfg: string): Element;
  public position(cfg: AttributeCfg): Element;
  public position(cfg: string | AttributeCfg): Element {
    if (_.isString(cfg)) {
      this._setAttrOptions('position', {
        fields: parseFields(<string>cfg),
      });
    } else {
      this._setAttrOptions('position', <AttributeCfg>cfg);
    }

    return this;
  }

  /**
   * 颜色通道的映射配置
   * @param cfg 颜色通道的映射规则
   */
  public color(field: AttributeCfg): Element;
  public color(field: string): Element;
  public color(field: string, cfg: string[]): Element;
  public color(field: string, cfg: ColorAttrCallback): Element;
  public color(field: AttributeCfg | string, cfg?: string[] | ColorAttrCallback): Element {
    this._createAttrOption('color', field, cfg);

    return this;
  }

  /**
   * 形状通道的映射配置
   * @param cfg 形状通道的映射规则
   */
  public shape(field: AttributeCfg): Element;
  public shape(field: string): Element;
  public shape(field: string, cfg: string[]): Element;
  public shape(field: string, cfg: ShapeAttrCallback): Element;
  public shape(field: AttributeCfg | string, cfg?: string[] | ShapeAttrCallback): Element {
    this._createAttrOption('shape', field, cfg);

    return this;
  }

  /**
   * TODO：如何支持接收相对值以及绝对值
   * 大小通道的映射配置
   * @param cfg 大小通道的映射规则
   */
  public size(field: AttributeCfg): Element;
  public size(field: number): Element;
  public size(field: string): Element;
  public size(field: string, cfg: [ number, number ]): Element;
  public size(field: string, cfg: SizeAttrCallback): Element;
  public size(field: AttributeCfg | number | string, cfg?: [ number, number ] | SizeAttrCallback): Element {
    this._createAttrOption('size', field, cfg);

    return this;
  }

  /**
   * 透明度的映射配置
   * @param cfg
   */
  public opacity(field: AttributeCfg): Element;
  public opacity(field: number): Element;
  public opacity(field: string): Element;
  public opacity(field: string, callback: OpacityAttrCallback): Element;
  public opacity(field: AttributeCfg | number | string, callback?: OpacityAttrCallback): Element {
    this._createAttrOption('opacity', field, callback);

    return this;
  }

  /**
   * Adjust 数据调整配置
   * @param cfg 数据调整配置项
   */
  public adjust(adjustCfg: string): Element;
  public adjust(adjustCfg: string[]): Element;
  public adjust(adjustCfg: AdjustCfg | AdjustCfg[]): Element;
  public adjust(adjustCfg: string | string[] | AdjustCfg | AdjustCfg[]): Element {
    let adjusts: any = adjustCfg;
    if (_.isString(adjustCfg) || _.isPlainObject(adjustCfg)) {
      adjusts = [ adjustCfg ];
    }
    _.each(adjusts, (adjust, index) => {
      if (!_.isObject(adjust)) {
        adjusts[index] = { type: adjust };
      }
    });

    this.set('adjustOptions', adjusts);
    return this;
  }

  /**
   * style 图形样式属性配置
   * @param cfg 图形样式配置
   */
  public style(field: StyleCfg): Element;
  public style(field: DataPointType): Element;
  public style(field: string, callback: StyleCallback): Element;
  public style(field: StyleCfg | DataPointType | string, callback?: StyleCallback) {
    if (_.isString(field)) {
      const fields = parseFields(field);
      this.set('styleOptions', {
        fields,
        callback,
      });
    } else {
      const { fields, callback, cfg } = field;
      if (fields || callback || cfg) {
        this.set('styleOptions', field);
      } else {
        this.set('styleOptions', {
          cfg: field,
        });
      }
    }

    return this;
  }

  /**
   * tooltip 映射配置
   * @param cfg tooltip 配置项
   */
  public tooltip(field: TooltipCfg): Element;
  public tooltip(field: boolean): Element;
  public tooltip(field: string): Element;
  public tooltip(field: string, cfg: TooltipCallback): Element;
  public tooltip(field: TooltipCfg | boolean | string, cfg?: TooltipCallback): Element {
    if (_.isString(field)) {
      const fields = parseFields(field);
      this.set('tooltipOptions', {
        fields,
        callback: cfg,
      });
    } else {
      this.set('tooltipOptions', field);
    }

    return this;
  }

  /**
   * label 映射配置
   * @param cfg label 配置项
   */
  public label(field: LabelOptions): Element;
  public label(field: boolean): Element;
  public label(field: string, cfg: LabelCfgCallback): Element;
  public label(field: LabelOptions | string | boolean, cfg?: LabelCfgCallback): Element {
    const labelOptions = {} as LabelOptions;
    if (_.isString(field)) {
      const fields = parseFields(field as string);
      labelOptions.fields = fields;
      labelOptions.callback = cfg;
      this.set('labelOptions', labelOptions);
    } else {
      this.set('labelOptions', field);
    }

    return this;
  }

  /**
   * element 上的动画配置
   * @param cfg 动画配置
   */
  public animate(cfg: AnimateCfg | boolean): Element {
    this.set('animateOptions', cfg);
    return this;
  }

  /**
   * 配置 element 下 shape 在 active 状态下的样式
   * @param cfg active 的样式，为 false 时表示不允许 active
   */
  active(cfg: DataPointType | false) {
    this.set('activeOptions', cfg);
    return this;
  }

  /**
   * 配置 element 下 shape 在 selected 状态下的样式
   * @param cfg selected 的样式，为 false 时表示不允许 selected
   */
  selected(cfg: DataPointType | false) {
    this.set('selectedOptions', cfg);
    return this;
  }

  /**
   * 配置 element 下 shape 在 inactive 状态下的样式
   * @param cfg inactive 的样式，为 false 时表示不允许 inactive
   */
  inactive(cfg: DataPointType | false) {
    this.set('inactiveOptions', cfg);
    return this;
  }

  /**
   * 初始化 element，生成 attribute, scale 对象，同时对数据进行处理
   */
  init() {
    // 将容器应用坐标系的变换
    const coord = this.get('coord');
    const shapeContainer = this.get('shapeContainer');
    shapeContainer.setMatrix(coord.matrix);

    // 执行统计函数
    const data = this.get('data'); // 原始数据

    // 生成图形属性对象以及对应的 scales
    this._initAttrs(data);

    // 创建 tooltip() 方法上声明字段对应的 scale 对象
    const tooltipOptions = this.get('tooltipOptions');
    if (tooltipOptions && tooltipOptions.fields) {
      const { fields } = tooltipOptions;
      fields.forEach((field) => {
        this.createScale(field, data); // 创建 tooltip 上对应的度量
      });
    }

    let dataArray = this._processData(data);
    dataArray = this._adjustData(dataArray);
    this.set('dataArray', dataArray);
  }

  bindStates() {
    if (this.get('view')) {
      const stateController = new StateController(this);
      stateController.bind();
      this.set('stateController', stateController);
    }
  }

  unbindStates() {
    if (this.get('view')) {
      const stateController = this.get('stateController');
      stateController && stateController.unbind();
    }
  }

  /**
   * 进行数据到图形空间的映射同时绘制图形
   */
  paint() {
    const coord = this.get('coord');
    const theme = this.get('theme');
    const dataArray = this.get('dataArray');
    const mappedArray = [];
    const shapeFactory = this._getShapeFactory();
    shapeFactory.setCoord(coord);
    shapeFactory.setTheme(theme.shape); // 获取主题

    const shapeContainer = this.get('shapeContainer');
    this._beforeMapping(dataArray);
    for (let i = 0, len = dataArray.length; i < len; i += 1) {
      let data = dataArray[i];
      data = this._mapping(data);
      mappedArray.push(data);
      this.draw(data, shapeContainer, shapeFactory, i);
    }
    // 添加 label
    if (this.get('labelOptions')) {
      const labelController = this.get('labelController');
      const labels = labelController.addLabels(_.union(...mappedArray), shapeContainer.get('children'));
      this.set('labels', labels);
    }

    if (!this.get('sortable')) {
      this._sort(mappedArray); // 便于数据的查找，需要对数据进行排序，用于 geom.findPoint()
    } else {
      this.set('dataArray', mappedArray);
    }
  }

  clear() {
    this.clearInner();
    this.set('scales', {});
    this.set('labels', null);
  }

  destroy() {
    this.clear();
    const shapeContainer = this.get('shapeContainer');
    shapeContainer && shapeContainer.remove();

    const container = this.get('container');
    container && container.remove();

    this.unbindStates();
    super.destroy();
  }

  /**
   * 获取图形属性对应的默认值
   * @param attrName 图形属性名称
   */
  getDefaultValue(attrName: string) {
    let value: any;
    const attr = this.getAttr(attrName);
    if (attr && _.isEmpty(attr.scales)) { // 获取映射至常量的值
      value = attr.values[0];
    }
    return value;
  }

  /**
   * 隐藏或者展示 Element
   * @param visible boolean 类型，是否可见
   * @param stopDraw 可选，boolean 类型，是否结束绘画
   */
  changeVisible(visible: boolean, stopDraw?: boolean) {
    this.set('visible', visible);

    const shapeContainer = this.get('shapeContainer');
    shapeContainer && shapeContainer.set('visible', visible);

    // should be done in controller
    const labelController = this.get('labelController');
    labelController && labelController.changeVisible(visible);

    if (!stopDraw && shapeContainer) {
      const canvas = this.get('canvas');
      canvas.draw();
    }
  }

  /**
   * 根据图形属性名称获取对应的图形属性对象
   * @param name 图形属性名
   */
  getAttr(name: string) {
    return this.get('attrs')[name];
  }

  /**
   * 获取同图例相关的图形属性对象
   */
  getAttrsForLegend() {
    const attrs = _.values(this.get('attrs'));
    return _.filter(attrs, (attr: Attribute) => _.contains(GROUP_ATTRS, attr.type));
  }

  /**
   * 获取 x 方向上的度量
   */
  getXScale() {
    return this.getAttr('position').scales[0];
  }

  /**
   * 获取 y 方向上的度量，目前只支持二维
   */
  getYScale() {
    return this.getAttr('position').scales[1];
  }

  /**
   * 获取 Element 上对应所有的图形对象 shape
   */
  getShapes(): Shape[] {
    const shapeContainer = this.get('shapeContainer');
    return shapeContainer.get('children');
  }

  /**
   * 判断 Element 是否位于极坐标系下
   */
  isInCircle(): boolean {
    const coord = this.get('coord');
    return !!(coord && coord.isPolar);
  }

  /**
   * 为每个 shape 添加额外的信息，用于动画
   * @param shape shape 实例
   * @param index 索引值，绘制的顺序，同数据顺序对应
   */
  appendShapeInfo(shape: Shape, index: number) {
    if (shape) {
      shape.setSilent('index', index);
      shape.setSilent('coord', this.get('coord'));
      shape.setSilent('scales', this.get('scales'));

      if (this.get('animate') && !_.isNil(this.get('animateOptions'))) {
        shape.setSilent('animateOptions', this.get('animateOptions'));
      }
    }
  }

  /**
   * 判断是否发生同 adjustType 对应的调整
   * @param adjustType adjust 类型
   */
  hasAdjust(adjustType: string) {
    const adjustOptions = this.get('adjustOptions');
    let rst = false;
    _.each(adjustOptions, (adjustOption: AdjustCfg) => {
      if (adjustOption.type === adjustType) {
        rst = true;
        return false;
      }
    });
    return rst;
  }

  /**
   * 获取图形属性对应的值
   * @param attr 图形属性对象
   * @param record 数据
   */
  getAttrValues(attr, record) {
    const scales = attr.scales;

    const params = _.map(scales, (scale: DataPointType) => {
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

  getSize(obj): number {
    const sizeController = this.get('sizeController');
    if (sizeController) {
      return sizeController.getSize(obj);
    }
  }

  getNormalizedSize(obj): number {
    const sizeController = this.get('sizeController');
    if (sizeController) {
      return sizeController.getNormalizedSize(obj);
    }
  }

  /**
   * 获取分组相关的度量
   */
  getGroupScales() {
    let scales = this.get('groupScales');
    if (!scales) {
      const attrs = _.values(this.get('attrs'));

      // 所有的分组 Attribute 实例
      const groupAttrs = _.filter(attrs, (attr: Attribute) => _.contains(GROUP_ATTRS, attr.type));
      // 所有的分组 scale
      const groupScales = _.map(
        groupAttrs,
        (attr: DataPointType) => _.filter(attr.scales, (scale: Scale) => scale.isCategory),
      );
      // 打平，去重
      scales = _.uniq(_.flatten(groupScales));

      this.set('groupScales', scales);
    }
    return scales;
  }

  /**
   * 获取图例的字段集合
   */
  getLegendFields() {
    let fields = [];
    const attrOptions = this.get('attrOptions'); // 因为会在生成 scale 前调用，所以通过 attrOptions 进行判断
    GROUP_ATTRS.forEach((attrName) => {
      const attrOption = attrOptions[attrName];
      const attrFields = _.get(attrOption, 'fields', []);
      fields = fields.concat(attrFields);
    });
    return _.uniq(fields);
  }

  /**
   * 是否合并 tooltip
   */
  isShareTooltip(): boolean {
    let isShareTooltip = this.get('shareTooltip');
    if (!this.getYScale()) { // 一维图表不合并 tooltip
      isShareTooltip = false;
    }
    return isShareTooltip;
  }

  /**
   * 根据画布坐标在 source 中查找匹配的数据
   * @param point 画布坐标
   * @param source 数据源(已排序)
   */
  findPoint(point: PointObject, source: DataPointType[]) {
    const tooltipController = this.get('tooltipController');
    return tooltipController.findPoint(point, source);
  }

  /**
   * 根据数据获取对应的 tooltip items 信息
   * @param data 数据记录
   * @param titleField tooltip title 字段名
   */
  getTooltipItems(data: DataPointType, titleField: string) {
    const tooltipController = this.get('tooltipController');
    return tooltipController.getTooltipItems(data, titleField);
  }

  /**
   * 获取 Y 轴上的最小值
   */
  getYMinValue(): number {
    const yScale = this.getYScale();
    const { min, max } = yScale;
    let value: number;

    if (min >= 0) {
      value = min;
    } else if (max <= 0) { // 当值全位于负区间时，需要保证 ymin 在区域内，不可为 0
      value = max;
    } else {
      value = 0;
    }
    return value;
  }

  /**
   * 为每个 shape 生成唯一标识 ID，用于动画
   * @param dataObj shape 的原始数据
   */
  getShapeId(dataObj: DataPointType) {
    let id = this.get('id');
    const keyFields = this.get('keyFields');
    if (keyFields && keyFields.length > 0) {
      _.each(keyFields, (key: string) => {
        id = `${id}-${dataObj[key]}`;
      });
    } else {
      const type = this.get('type');
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xField = xScale.field || 'x';
      const yField = yScale.field || 'y';
      const yVal = dataObj[yField];
      let xVal;
      if (xScale.isIdentity) {
        xVal = xScale.values[0];
      } else {
        xVal = dataObj[xField];
      }

      if (type === 'interval' || type === 'schema') {
        id = `${id}-${xVal}`;
      } else if (type === 'line' || type === 'area' || type === 'path') {
        id = `${id}-${type}`;
      } else {
        id = `${id}-${xVal}-${yVal}`;
      }

      const groupScales = this.getGroupScales();
      if (!_.isEmpty(groupScales)) {
        _.each(groupScales, (groupScale: Scale) => {
          // @ts-ignore
          const field = groupScale.field;
          if (groupScale.type !== 'identity') {
            id = `${id}-${dataObj[field]}`;
          }
        });
      }
    }

    return id;
  }

  /**
   * 根据画布坐标点获取对应的原始数据
   * @param point 画布坐标点
   */
  protected getOriginDataByPoint(point: PointObject) {
    const xScale = this.getXScale();
    const yScale = this.getYScale();
    const coord = this.get('coord');

    const invertPoint = coord.invert(point);
    const xValue = xScale.invert(invertPoint.x);
    const yValue = yScale.invert(invertPoint.y);
    const xField = xScale.field;
    const yField = yScale.field;

    return {
      [xField]: xValue,
      [yField]: yValue,
    };
  }

  /**
   * @protected
   * 根据数据获取图形的关键点数据
   * @param obj 数据对象
   */
  protected createShapePointsCfg(obj): DataPointType {
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
      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined,
    };
  }

  /**
   * @protected
   * 根据数据生成图形
   * @param data 需要绘制的数据集合
   * @param container 图形容器
   * @param shapeFactory shape 的管理对象
   * @param index 索引值
   */
  protected draw(data: DataPointType[], container: Group, shapeFactory, index: number) {
    for (let i = 0, len = data.length; i < len; i += 1) {
      const obj = data[i];
      this.drawPoint(obj, container, shapeFactory, index + i);
    }
  }

  /**
   * @protected
   * 绘制具体的 shape
   * @param obj 需要绘制的一套数据
   * @param container 图形容器
   * @param shapeFactory  shape 的管理对象
   * @param index 索引值
   */
  protected drawPoint(obj: DataPointType, container: Group, shapeFactory, index: number) {
    const shape = obj.shape;
    const cfg = this.getDrawCfg(obj);
    const geomShape = shapeFactory.drawShape(shape, cfg, container);
    this.appendShapeInfo(geomShape, index);
  }

  /**
   * 构造绘图图形需要的属性
   * @param obj 数据
   */
  protected getDrawCfg(obj) {
    const cfg: ShapeDrawCFG = {
      origin: obj,
      x: obj.x,
      y: obj.y,
      color: obj.color,
      size: obj.size,
      shape: obj.shape,
      isInCircle: this.isInCircle(),
      opacity: obj.opacity,
    };

    const styleOptions = this.get('styleOptions');
    if (styleOptions) {
      cfg.style = this._getStyleCfg(styleOptions, obj[FIELD_ORIGIN]);
    }
    if (this.get('generatePoints')) {
      cfg.points = obj.points;
      cfg.nextPoints = obj.nextPoints;
    }
    if (this.get('animate')) { // id 字段仅用于动画
      cfg.id = this.getShapeId(obj[FIELD_ORIGIN]);
    }
    return cfg;
  }

  protected clearInner() {
    // this.clearActivedShapes();
    // this.clearSelected();
    const shapeContainer = this.get('shapeContainer');
    shapeContainer && shapeContainer.clear();

    // 由于 Labels 对应的模块需要生成group，所以这个地方需要删除
    const labelController = this.get('labelController');
    labelController && labelController.clear();

    this.set('attrs', {});
    this.set('groupScales', null);

    const sizeController = this.get('sizeController');
    sizeController && sizeController.clear();
    const tooltipController = this.get('tooltipController');
    tooltipController.clear();
    // todo clear other controller
  }

  // 创建图形属性相关的配置项
  private _createAttrOption(attrName: string, field: AttributeCfg | string | number, cfg?) {
    if (_.isObject(field)) {
      this._setAttrOptions(attrName, <AttributeCfg>field);
    } else {
      const attrCfg: AttributeCfg = {};
      if (_.isNumber(field)) { // size(3), opacity(0.8)
        attrCfg.values = [ field ];
      } else {
        attrCfg.fields = parseFields(<string>field);
      }

      if (cfg) {
        if (_.isFunction(cfg)) {
          attrCfg.callback = cfg;
        } else {
          attrCfg.values = cfg;
        }
      }

      this._setAttrOptions(attrName, attrCfg);
    }
  }

  // 初始化容器
  private _initContainer() {
    const container = this.get('container');
    const view = this.get('view'); // element 所在的 view
    const viewId = view.get('id');
    const visible = this.get('visible');
    const shapeContainer = container.addGroup({
      viewId, // 用于动画缓存 shape
      visible,
    });
    this.set('shapeContainer', shapeContainer);
  }

  // 初始化 element 相关的控制器
  private _initController() {
    // tooltipController
    const tooltipController = new TooltipController(this);
    this.set('tooltipController', tooltipController);
    // labelController
    const labelController = new LabelController(this);
    this.set('labelController', labelController);
  }

  // 存储用户设置的图形属性配置项
  private _setAttrOptions(name: string, cfg: AttributeCfg) {
    const attrOptions = this.get('attrOptions');
    attrOptions[name] = cfg;
  }

  // 给字段创建度量
  public createScale(field: string, data?: DataPointType[]) {
    const view = this.get('view');
    const scales = this.get('scales');
    let scale = scales[field];
    if (!scale) {
      scale = view._initScale(field, data);
      scales[field] = scale;
    }
    return scale;
  }

  // 初始化 Attribute 实例同时生成相关的 scale 度量
  private _initAttrs(data: DataPointType[]) {
    const attrs = this.get('attrs'); // attribute 实例
    const attrOptions = this.get('attrOptions'); // 传入的配置
    const coord = this.get('coord');
    const theme = this.get('theme');
    const geomType = this.get('type');

    // 遍历每一个 attrOption，各自创建 Attribute 实例
    _.each(attrOptions, (option: AttributeCfg, type: string) => {
      const attrOption: AttrInstanceCfg = {
        ...option,
      };
      const { callback, values, fields = [] } = attrOption;
      // 饼图的特殊逻辑，填充 position 上的一维映射
      if (type === 'position' && fields.length === 1 && coord.type === 'theta') {
        fields.unshift('1');
      }

      // 给每一个字段创建 scale
      const scales = _.map(fields, (field) => {
        return this.createScale(field, data);
      });

      // 饼图需要填充满整个空间
      if (coord.type === 'theta' && type === 'position' && scales.length > 1) {
        const yScale = scales[1];
        yScale.change({
          nice: false,
          min: 0,
          max: Math.max.apply(null, yScale.values),
        });
      }
      attrOption.scales = scales;

      if (
        _.indexOf([ 'color', 'size', 'shape', 'opacity' ], type) !== -1 &&
        scales.length === 1 && scales[0].isIdentity) { // 用户在图形通道上声明了常量字段 color('red'), size(5)
        attrOption.values = scales[0].values;
      } else if (!callback && !values) { // 用户没有指定任何规则，则使用默认的映射规则
        if (type === 'size') {
          attrOption.values = theme.sizes;
        } else if (type === 'shape') {
          attrOption.values = theme.shapes[geomType] || [];
        } else if (type === 'opacity') {
          attrOption.values = theme.opacities;
        } else if (type === 'color' && scales.length) { // TODO 需要优化
          const valuesLen = scales[0].values.length;
          if (valuesLen <= 10) {
            attrOption.values = theme.colors;
          } else {
            attrOption.values = theme.colors_20;
          }
        }
      }
      const attrCtor = getAttribute(type);
      attrs[type] = new attrCtor(attrOption);
    });
  }

  // 更新发生层叠后的数据对应的度量范围
  private _updateStackRange(field, scale, dataArray) {
    const mergeArray = _.flatten(dataArray);
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

  // 对数据进行分组
  private _groupData(data: DataPointType[]): DataPointType[][] {
    const groupScales = this.getGroupScales();
    const fields = groupScales.map((scale) => scale.field);

    return _.group(data, fields);
  }

  // 数据调整前保存原始数据
  private _saveOrigin(data: DataPointType[]): DataPointType[] {
    return _.map(data, (origin) => {
      return {
        ...origin,
        [FIELD_ORIGIN]: origin, // 存入 origin 数据
      };
    });
  }

  // 将分类数据翻译成数据, 仅对位置相关的度量进行数字化处理
  private _numeric(data: DataPointType[]) {
    const positionAttr = this.getAttr('position');
    const scales = positionAttr.scales;
    for (let j = 0, len = data.length; j < len; j += 1) {
      const obj = data[j];
      for (let i = 0; i < Math.min(2, scales.length); i += 1) {
        const scale = scales[i];
        if (scale.isCategory) {
          const field = scale.field;
          obj[field] = scale.translate(obj[field]); // TODO
        }
      }
    }
  }

  // 处理数据：分组、存储原始数据、将分类数据数字化
  private _processData(data: DataPointType[]): DataPointType[][] {
    const groupedArray = this._groupData(data);

    return _.map(groupedArray, (subData) => {
      const tempData = this._saveOrigin(subData);
      this._numeric(tempData);
      return tempData;
    });
  }

  // 进行数据调整
  private _adjustData(dataArray: DataPointType[][]): DataPointType[][] {
    const adjustOptions = this.get('adjustOptions');
    let result = dataArray;
    if (adjustOptions) {
      const theme = this.get('theme');
      const xScale = this.getXScale();
      const yScale = this.getYScale();
      const xField = xScale.field;
      const yField = yScale ? yScale.field : null;
      adjustOptions.forEach((adjust: AdjustCfg) => {
        const adjustCfg: AdjustInstanceCfg = {
          xField,
          yField,
          ...adjust,
        };
        const type = adjust.type;
        if (type === 'dodge') {
          const adjustNames = [];
          if (xScale.isCategory || xScale.isIdentity) {
            adjustNames.push('x');
          } else if (!yScale) {
            adjustNames.push('y');
          } else {
            throw new Error('dodge is not support linear attribute, please use category attribute!');
          }
          adjustCfg.adjustNames = adjustNames;
          adjustCfg.dodgeRatio = this.get('widthRatio').column;
        } else if (type === 'stack') {
          const coord = this.get('coord');
          if (!yScale) {
            // 一维的情况下获取高度和默认size
            adjustCfg.height = coord.getHeight();
            const size = this.getDefaultValue('size') || 3;
            adjustCfg.size = size;
          }
          // 不进行 transpose 时，用户又没有设置这个参数时，默认从上向下
          if (!coord.isTransposed && _.isNil(adjustCfg.reverseOrder)) {
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

  // 获取 element 对应 shape 的工厂对象
  private _getShapeFactory() {
    let shapeFactory = this.get('shapeFactory');
    if (!shapeFactory) {
      const shapeType = this.get('shapeType');
      shapeFactory = getShapeFactory(shapeType);
      this.set('shapeFactory', shapeFactory);
    }

    return shapeFactory;
  }

  // 生成 shape 的关键点
  private _generatePoints(data: DataPointType[]) {
    const shapeFactory = this._getShapeFactory();
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
    if (_.isArray(values)) {
      for (let i = 0, len = values.length; i < len; i += 1) {
        const v = values[i];
        rst.push(scale.scale(v));
      }
    } else {
      rst = scale.scale(values);
    }
    return rst;
  }

  // 将数据映射至图形空间前的操作：排序以及关键点的生成
  private _beforeMapping(dataArray: DataPointType[][]) {
    if (this.get('sortable')) {
      const xScale = this.getXScale();
      const field = xScale.field;
      _.each(dataArray, (data) => {
        data.sort((v1: DataPointType, v2: DataPointType) => {
          return xScale.translate(v1[field]) - xScale.translate(v2[field]); // TODO
        });
      });
    }
    if (this.get('generatePoints')) {
      _.each(dataArray, (data) => {
        this._generatePoints(data);
      });
      _.each(dataArray, (data, index) => {
        const nextData = dataArray[index + 1];
        if (nextData) {
          data[0].nextPoints = nextData[0].points;
        }
      });
    }
  }

  // 将数据映射至图形空间
  private _mapping(data: DataPointType[]) {
    const attrs = this.get('attrs');
    const mappedData = [];
    for (let i = 0, len = data.length; i < len; i += 1) {
      const record = data[i];
      const newRecord: MappingResult = {
        _origin: record[FIELD_ORIGIN],
        points: record.points,
        nextPoints: record.nextPoints,
      };
      for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          const attr = attrs[k];
          const names = attr.names;
          const values = this.getAttrValues(attr, record);
          if (names.length > 1) { // position 之类的生成多个字段的属性
            for (let j = 0; j < values.length; j += 1) {
              const val = values[j];
              const name = names[j];
              newRecord[name] = (_.isArray(val) && val.length === 1) ? val[0] : val; // 只有一个值时返回第一个属性值
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
  private _convertPoint(mappedRecord: MappingResult) {
    const { x, y } = mappedRecord;
    if (_.isNil(x) || _.isNil(y)) {
      return;
    }

    let rstX;
    let rstY;
    let obj;
    const coord = this.get('coord');
    if (_.isArray(y) && _.isArray(x)) {
      rstX = [];
      rstY = [];
      for (let i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i += 1 , j += 1) {
        obj = coord.convertPoint({
          x: x[i],
          y: y[j],
        });
        rstX.push(obj.x);
        rstY.push(obj.y);
      }
    } else if (_.isArray(y)) {
      rstY = [];
      y.forEach((yVal) => {
        obj = coord.convertPoint({
          x,
          y: yVal,
        });
        if (rstX && rstX !== obj.x) {
          if (!_.isArray(rstX)) {
            rstX = [ rstX ];
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
        obj = coord.convertPoint({
          x: xVal,
          y,
        });
        if (rstY && rstY !== obj.y) {
          if (!_.isArray(rstY)) {
            rstY = [ rstY ];
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

  // 获取 style 配置
  private _getStyleCfg(styleOptions: StyleCfg, origin: DataPointType) {
    const { fields = [], callback, cfg } = styleOptions;
    if (cfg) { // 用户直接配置样式属性
      return cfg;
    }

    const params = fields.map((field) => {
      return origin[field];
    });

    return callback(...params);
  }

  // 对数据进行排序
  private _sort(mappedArray: DataPointType[][]) {
    const xScale = this.getXScale();
    const xField = xScale.field;
    _.each(mappedArray, (itemArr) => {
      itemArr.sort((obj1, obj2) => {
        return xScale.translate(obj1[FIELD_ORIGIN][xField]) - xScale.translate(obj2[FIELD_ORIGIN][xField]);
      });
    });

    this.set('dataArray', mappedArray);
  }

}
