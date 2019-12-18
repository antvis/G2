import * as _ from '@antv/util';
import { Scale } from '../dependents';
import Base from '../base';
import Global from '../global';
import Animate from '../animate';
import ScaleController from './controller/scale';
import CoordController from './controller/coordinate';
import AnnController from './controller/annotation';
import LegendController from './controller/legend';
import AxisController from './controller/axis';
import TooltipController from './controller/tooltip';
import ShapeStateController from './controller/shape-state';
import EventController from './controller/event';
import { getTheme } from '../theme';
import { getFacet } from '../facet';
import {
  DataPointType,
  PointObject,
} from '../interface';
import {
  LegendOption,
  CoordinateOption,
  CoordinateType,
  CoordinateCfg,
  AxisOptions,
  AxisOption,
  TooltipOption,
  FilterCallback,
  ScaleOption,
  ScalesOption,
} from './interface';
import {
  Element,
  ElementConstructor,
  getElement,
} from '../element';
import {
  getInteraction,
  Interaction,
} from '../interaction';
import { BBox } from '@antv/g';
import { parsePadding } from '../util';
import { Facet } from '../facet/base';
import { Util } from '..';

// 判断极坐标是否是一个整圆
function isFullCircle(coord) {
  if (coord.isPolar) {
    const { startAngle, endAngle } = coord;
    return (endAngle - startAngle) === Math.PI * 2;
  }
  return false;
}
const FIELD_ORIGIN = '_origin';

// TODO maintaining options

export default class View extends Base {
  // FIXME: 临时解决 view.elementType eslint。因为是通过prototype注册的属性，无法预知属性名和Element
  [key: string]: any;
  constructor(cfg: DataPointType) {
    super({
      animate: Global.animate,
      widthRatio: Global.widthRatio,
      canvas: null,
      container: null, // required
      coord: null,
      elements: [],
      guideController: null,
      id: _.uniqueId('view_'),
      options: {},
      padding: Global.theme.padding,
      parent: null,
      scaleController: null,
      scales: {},
      start: { x: 0, y: 0 }, // 矩形左上角
      end: { x: 1, y: 1 }, // 矩形右下角
      width: null,
      height: null,
      theme: null,
      title: null,
      views: [],
      visible: true,
      backgroundStyle: {},
      interactions: {},
      ...cfg,
    });

    this.init();
  }

  // 坐标轴配置
  public axis(field: boolean): View;
  public axis(field: AxisOptions): View;
  public axis(field: string, cfg: AxisOption | boolean): View;
  public axis(field: string | boolean | AxisOptions, cfg?: AxisOption | boolean): View {
    const options = this.get('options') || {};
    if (field === false) {
      options.axes = false;
      _.set(options, 'axes', false);
    } else if (_.isObject(field)) {
      _.set(options, [ 'axes', 'fields' ], field);
    } else if (_.isString(field)) {
      _.set(options, [ 'axes', 'fields', field ], cfg);
    } else {
      _.set(options, 'axes', cfg);
    }

    return this;
  }

  // TODO: 图表标题配置
  public title(options) {}

  // Tooltip 提示信息配置
  public tooltip(visible: boolean): View;
  public tooltip(visible: boolean, cfg: TooltipOption): View;
  public tooltip(visible: TooltipOption): View;
  public tooltip(visible: boolean | TooltipOption, cfg?: TooltipOption) {
    const options = this.get('options');
    if (!options.tooltip) {
      options.tooltip = {};
    }

    if (visible === false) {
      options.tooltip = false;
    } else if (_.isObject(visible)) {
      _.mix(options.tooltip, visible);
    } else {
      _.mix(options.tooltip, cfg);
    }

    return this;
  }

  // 图例配置
  public legend(field: boolean): View;
  public legend(field: LegendOption): View;
  public legend(field: string, cfg: LegendOption | boolean): View;
  public legend(field: string | boolean | LegendOption, cfg?: LegendOption | boolean): View {
    const options = this.get('options');
    if (field === false) {
      // 整体关闭图例
      _.set(options, 'legends', false);
    } else if (_.isObject(field)) {
      // 全局配置图例
      _.set(options, 'legends', field);
    } else if (_.isString(field)) {
      _.set(options, [ 'legends', 'fields', field ], cfg);
    } else {
      _.set(options, 'legends', cfg);
    }
    return this;
  }

  // 静态标注
  public annotation() {
    return this.get('annotationController');
  }

  // data
  // 更新数据
  public changeData(data: DataPointType[]): View {
    this.emit('beforechangedata');
    this.set('data', data);
    this._initData();
    this.emit('afterchangedata');
    this.repaint();

    return this;
  }

  // 加载数据
  public data(data: DataPointType[]): View {
    this.set('data', data);
    this._initData();
    return this;
  }

  // 配置列定义
  public scale(field: ScalesOption): View;
  public scale(field: string, cfg: ScaleOption): View;
  public scale(field: string | ScalesOption, cfg?: ScaleOption): View {
    const options = this.get('options');
    const scaleDefs = options.scales;
    if (_.isObject(field)) {
      _.mix(scaleDefs, field);
    } else {
      scaleDefs[field as string] = cfg;
    }
    return this;
  }

  // 过滤需要绘制的数据，但是不会改变传入的数据源，如果存在对应的图例，则过滤掉的字段置灰
  public filter(field: string, condition: FilterCallback) {
    const options = this.get('options');
    if (!options.filters) {
      options.filters = {};
    }
    options.filters[field] = condition;
    return this;
  }

  // 进行坐标系配置
  public coordinate(type: CoordinateOption): CoordController;
  public coordinate(type: CoordinateType, cfg: CoordinateCfg): CoordController;
  public coordinate(type: CoordinateOption | CoordinateType, cfg?: CoordinateCfg): CoordController {
    const coordController = this.get('coordController');

    if (_.isObject(type)) {
      coordController.reset(type);
    } else {
      coordController.reset({
        type,
        cfg,
      });
    }

    return coordController;
  }

  /**
   * 创建新的子 view
   * @param cfg
   */
  public createView(cfg: any = {}): View {
    // view 中已有的子 views 数组
    const views = this.get('views');

    const newCfg = {
      theme: this.get('theme'),
      parent: this,
      container: this.get('panelGroup'),
      canvas: this.get('canvas'),
      animate: this.get('animate'),
      ...cfg,
    };

    // options 中的配置
    newCfg.options = _.mix({}, this._getSharedOptions(), cfg.options);
    const view = new View(newCfg);
    view.set('id', _.uniqueId('view_')); // 标识 ID，防止同用户设定的 id 重名

    views.push(view);

    this.emit('addview', { view });
    return view;
  }

  /**
   * 移除 view
   * @param view
   */
  public removeView(view) {
    const views = this.get('views');
    _.pull(views, view);
    view.destroy();
  }

  /**
   * 分面操作
   * @param option
   */
  public facet(option) {
    // 先销毁掉之前的分面
    const preFacet: Facet = this.get('facet');
    if (preFacet) preFacet.destroy();

    // 创建新的分面
    const type: string = _.get(option, 'type');
    const ctor = getFacet(type);

    if (!ctor) throw new Error(`facet '${type}' is not exist!`);

    this.set('facet', new ctor(this, option));
  }
  /**
   * 配置动画参数
   * @param enable
   */
  public animate(enable: boolean) {
    const options = this.get('options');
    options.animate = enable;
    this.set('animate', enable);
    return this;
  }
  public render(stopDrawing?: boolean) {
    this._clearInner();
    this.emit('beforerender');
    this._beforeRender();
    this.emit('beforedraw');
    this._drawGuides();
    this._drawElements();
    // 渲染 facet
    this._renderFacet();
    // TODO children
    if (this.get('views').length) {
      _.each(this.get('views'), (view: View) => {
        view.render(stopDrawing);
      });
    }
    this._addBackShape();
    this._canvasDraw(stopDrawing);
    this.emit('afterdraw');
    this.emit('afterrender');
    this.set('rendered', true);
    return this;
  }

  public changeVisible(visible: boolean, stopDrawing?: boolean) {
    _.each(this.get('elements'), (element: Element) => {
      element.changeVisible(visible, true);
    });
    this.get('container').set('visible', visible);

    const annotationController: AnnController = this.get('annotationController');
    annotationController && annotationController.changeVisible(visible);

    const axisController = this.get('axisController');
    axisController && axisController.changeVisible(visible);

    if (!stopDrawing) {
      this.get('canvas').draw();
    }
  }

  public isShapeInView(shape) {
    const id = this.get('id');
    const shapeViewId = shape.get('viewId');
    if (shapeViewId) {
      return shapeViewId === id;
    } {
      const container = this.get('container');
      let parent = shape.get('parent');
      while (parent) {
        if (parent === container) {
          shape.set('viewId', this.get('id'));
          return true;
        }
        parent = parent.get('parent');
      }
    }
    return false;
  }

  public isPointInView(point) {
    const viewRange = this.get('viewRange');
    if (point.x > viewRange.minX && point.x < viewRange.maxX && point.y > viewRange.minY && point.y < viewRange.maxY) {
      return true;
    }
    return false;
  }

  /**
   * 获取 x 轴的度量
   */
  public getXScale() {
    const elements = this.get('elements');
    if (elements.length) {
      return elements[0].getXScale();
    }
    return null;
  }

  /**
   * 获取 y 轴所有的度量
   */
  public getYScales() {
    const elements = this.get('elements');
    const yScales = [];
    elements.forEach((element) => {
      const yScale = element.getYScale();
      if (yScale && _.indexOf(yScales, yScale) === -1) {
        yScales.push(yScale);
      }
    });
    return yScales;
  }

  /**
   * 获取原始数据对应的画布坐标
   * @param data 原始数据
   */
  public getXY(data: DataPointType) {
    const coord = this.get('coord');
    const xScales = this._getScales('x');
    const yScales = this._getScales('y');
    let x;
    let y;

    for (const field in data) {
      if (xScales[field]) {
        x = xScales[field].scale(data[field]);
      }
      if (yScales[field]) {
        y = yScales[field].scale(data[field]);
      }
    }

    if (!_.isNil(x) && !_.isNil(y)) {
      return coord.convert({
        x,
        y,
      });
    }

    return null;
  }

  /**
   * 根据传入的坐标展示该点对应的 tooltip 内容
   * @param point 画布坐标
   */
  public showTooltip(point: PointObject): View {
    const tooltipController = this.get('tooltipController');
    tooltipController.showTooltip(point, this);

    return this;
  }

  /**
   * 隐藏 tooltip
   */
  public hideTooltip(): View {
    const tooltipController = this.get('tooltipController');
    tooltipController.hideTooltip();

    return this;
  }

  /**
   * 根据传入的画布坐标，获取该处的 tooltip 上的记录信息
   * @param point 画布坐标点
   */
  public getTooltipItems(point: PointObject) {
    let rst = [];
    // const elements = this.get('elements');
    const elements = this.getElements();
    _.each(elements, (element) => {
      const dataArray = element.get('dataArray');
      let items = [];
      _.each(dataArray, (data) => {
        const tmpPoint = element.findPoint(point, data);
        if (tmpPoint) {
          const subItems = element.getTooltipItems(tmpPoint);
          items = items.concat(subItems);
        }
      });
      rst = rst.concat(items);
    });

    return rst;
  }

  // lifecycle
  public init() {
    this._initTheme();
    this._initLayers();
    this.initRegion();
    this._initOptions();
    this._initControllers();
    this._bindEvents();

    if (this.get('data')) {
      this._initData();
    }
  }

  public destroy() {
    this._clearEvents();
    this.off(); // events
    this.clear(); // UI, models, etc.
    this.clearAllInteractions(); // clearAllInteractions需要在_destroyViewGroups前面，因为某些interaction依赖group
    this._destroyViewGroups();

    super.destroy();
  }

  public clear() {
    this.set('isUpdate', false);
    this._clearInner();
    this._destroyElements();
    return this;
  }

  /**
   * 清空并重绘
   */
  public repaint() {
    this.set('isUpdate', true); // 标识符，用于更新动画
    // this._clearInner();
    this.render();

    return this;
  }

  /* 还有其他的一些 view 数据获取的方法 */

  /**
   * 深度遍历所有的 shape，执行回调函数
   * @param fn 回调函数包含参数：record,shape,element,view
   * @return view 当前视图
   */
  eachShape(fn: Function) {
    const views: View[] = this.get('views');
    const canvas = this.get('canvas');

    // 先深度遍历 views
    _.each(views, (view) => {
      view.eachShape(fn);
    });

    // 在遍历当前 view 中的 elements
    const elements: Element[] = this.get('elements');
    _.each(elements, (element) => {
      // 遍历每一个 shape
      const shapes = element.getShapes();

      _.each(shapes, (shape) => {
        const origin = shape.get('origin');
        if (_.isArray(origin)) {
          const arr = origin.map((obj) => {
            return obj[FIELD_ORIGIN];
          });
          fn(arr, shape, element, this);
        } else {
          const obj = origin[FIELD_ORIGIN];
          fn(obj, shape, element, this);
        }
      });
    });
    canvas.draw();
    return this;
  }

  /**
   * 获得所有的 element，
   * @param recursive 是否递归获取，默认为 false
   */
  public getElements(recursive: boolean = false) {
    let elements = [ ...this.get('elements') ];

    if (recursive) {
      const views: View[] = this.get('views');
      _.each(views, (view) => {
        elements = elements.concat(view.getElements(recursive));
      });
    }

    return elements;
  }

  /**
   * 获取过滤后的值（需要显示的值）
   * @param field 度量
   * @return  滤后的值
   */
  public getFilteredValues(field: string): string[] {
    const scale = this.get('scales')[field];
    const values = scale.values;
    const filters = this._getFilters();
    let rst;
    if (filters && filters[field]) {
      rst = values.filter(filters[field]);
    } else {
      rst = values.slice(0);
    }
    return rst;
  }

  /**
   * 获取被过滤的值（不需显示的值）
   * @param field 度量
   * @return 滤出的值
   */
  public getFilteredOutValues(field: string): string[] {
    const scale = this.get('scales')[field];
    const values = scale.values;
    const filters = this._getFilters();
    let rst;
    if (filters && filters[field]) {
      rst = values.filter((v) => !filters[field](v));
    } else {
      rst = [];
    }
    return rst;
  }

  /**
   * 设置图形active状态量
   * @param exp 状态量的值
   * @param draw 是否触发canvas重绘
   */
  public setActive(exp: any, draw: boolean = true) {
    const shapeStateController = this.get('shapeStateController');
    shapeStateController.setState('active', exp, draw);
    return this;
  }

  /**
   * 设置图形selected状态量
   * @param exp 状态量的值
   * @param draw 是否触发canvas重绘
   */
  public setSelected(exp: any, draw: boolean = true) {
    const shapeStateController = this.get('shapeStateController');
    shapeStateController.setState('selected', exp, draw);
    return this;
  }

  /**
   * 设置图形inactive状态量
   * @param exp 状态量的值
   * @param draw 是否触发canvas重绘
   */
  public setInactive(exp: any, draw: boolean = true) {
    const shapeStateController = this.get('shapeStateController');
    shapeStateController.setState('inactive', exp, draw);
    return this;
  }

  public clearAllInteractions() {
    const interactions = this.get('interactions');
    _.each(interactions, (interaction: Interaction, key: string) => {
      interaction.destroy();
      delete interactions[key];
    });
    return this;
  }

  public clearInteraction(type: string) {
    const interactions = this.get('interactions');
    if (interactions[type]) {
      interactions[type].destroy();
      delete interactions[type];
    }
    return this;
  }

  public interaction(type: string, cfg: any = {}) {
    cfg.view = this;
    const Ctor = getInteraction(type);
    const interaction = new Ctor(cfg);
    this._setInteraction(type, interaction);
    return this;
  }

  // private / protected methods

  // if facet exist, render it.
  private _renderFacet() {
    const facet: Facet = this.get('facet');

    if (facet) facet.render();
  }

  /* 获得可以共享给子 view 的配置信息
   * @private
   */
  private _getSharedOptions() {
    const options = this.get('options');
    const { scales, coord, axes } = options;

    return {
      scales,
      coord,
      axes,
    };
  }

  private _getFilters() {
    const options = this.get('options');
    return options.filters;
  }

  // TODO 在 extend 之前，保留 private，如果 Plot 类有调用，再改为 protected

  private _initTheme() {
    const theme = this.get('theme');
    const viewTheme = {};
    let newTheme = {};
    if (_.isObject(theme)) {
      newTheme = theme;
    } else if (_.isString(theme)) {
      newTheme = getTheme(theme);
    }
    _.deepMix(viewTheme, Global.theme, newTheme);
    this.set('theme', viewTheme);
  }

  private _bindEvents() {
    const eventController = this.get('eventController');
    eventController.bindEvents();
  }

  private _clearEvents() {
    const eventController = this.get('eventController');
    eventController.clearEvents();
  }

  private _initLayers() {
    const container = this.get('container');

    const backgroundGroup = container.addGroup({
      name: 'backgroundGroup',
      zIndex: 0,
      viewId:this.get('id'),
    });
    const panelGroup = container.addGroup({
      name: 'panelGroup',
      zIndex: 1,
      viewId:this.get('id'),
    });
    const frontgroundGroup = container.addGroup({
      name: 'frontgroundGroup',
      zIndex: 2,
    });
    this.set('frontgroundGroup', frontgroundGroup);
    this.set('backgroundGroup', backgroundGroup);
    this.set('panelGroup', panelGroup);
  }

  // 生成 view 以及绘图区域的范围
  public initRegion() {
    // TODO: AutoPadding 场景
    let { x: startX, y: startY } = this.get('start');
    let { x: endX, y: endY } = this.get('end');
    const parent = this.get('parent');

    if (parent) {
      const { width, height, tl } = parent.get('panelRange');
      // 判断 start 和 end 是像素值还是 0 - 1 范围的数据
      if (endX - startX <= 1) { // 0 -1 返回的数据，将其转换为像素值
        startX *= width;
        startY *= height;
        endX *= width;
        endY *= height;
      }
      startX += tl.x;
      endX += tl.x;
      startY += tl.y;
      endY += tl.y;
    } else if (endX - startX <= 1) {
      const width = this.get('width');
      const height = this.get('height');
      startX *= width;
      startY *= height;
      endX *= width;
      endY *= height;
    }
    // else {
    //   startX = 0;
    //   startY = 0;
    //   endX = this.get('width');
    //   endY = this.get('height');
    // }

    const viewWidth = endX - startX;
    const viewHeight = endY - startY;
    this.set('viewRange', new BBox(startX, startY, viewWidth, viewHeight)); // 获取子 view 整体范围（包含坐标轴）

    const padding = parsePadding(this.get('padding'));
    const [ top, right, bottom, left ] = padding;
    const panelRange = new BBox(startX + left, startY + top, viewWidth - left - right, viewHeight - top - bottom);
    this.set('panelRange', panelRange); // 获取子 view 绘图区域范围，即 elements 绘图范围
  }

  private _initData() {
    // now do nothing here.
  }

  private _initOptions() {
    const options = _.mix({}, this.get('options')); // shadow copy
    if (!options.scales) {
      options.scales = {};
    }
    if (!options.coord) {
      options.coord = {};
    }

    // animate 默认为 true，只有显示设置为 false 的时候，才为 false
    if (!_.isUndefined(options.animate)) {
      this.set('animate', !!options.animate);
    }

    // TODO guides, annotations
    if (options.elements && options.elements.length) {
      _.each(options.elements, (cfg) => {
        this._createElement(cfg);
      });
    }
    const scaleController = this.get('scaleController');
    if (scaleController) {
      scaleController.defs = options.scales;
    }
    const coordController = this.get('coordController');
    if (coordController) {
      coordController.reset(options.coord);
    }
    this.set('options', options);
  }

  private _drawGuides() {
    if (!this.get('keepLegend')) {
      this._renderLegend();
    }
    this._renderAnnotations();
    this._renderAxes();
    this._renderTooltip();
  }

  private _renderAxes() {
    const options = this.get('options');
    const axesOptions = options.axes;
    if (axesOptions === false) {
      return; // 不渲染
    }

    const axisController = this.get('axisController');
    // 如果直接传入 this.get('backgroundGroup')，当调用 axisController.clear() 时，会将 annotationController 创建的 backgroundGroup 销毁
    axisController.container = this.get('backgroundGroup').addGroup({
      name: 'axisGroup',
    });
    axisController.coord = this.get('coord');
    axisController.options = _.get(options, 'axes', {});
    const xScale = this.getXScale();
    const yScales = this.getYScales();
    const viewId = this.get('id');
    axisController.createAxis(xScale, yScales, viewId);
  }

  private _renderTooltip() {
    const options = this.get('options');
    // 用户没有配置 tooltip 或者未显示关闭，则进行 tooltip 的渲染
    if (_.isNil(options.tooltip) || options.tooltip !== false) {
      const tooltipController = this.get('tooltipController');
      tooltipController.options = options.tooltip || {};
      tooltipController.renderTooltip();
    }
  }

  private _initControllers() {
    const options = this.get('options');
    const theme = this.get('theme');
    const canvas = this.get('canvas');

    const scaleController = new ScaleController(options.scales); // TODO 支持透传图表尺寸等
    this.set('scaleController', scaleController);

    const coordController = new CoordController(options.coord);
    this.set('coordController', coordController);

    const eventController = new EventController({
      canvas: this.get('canvas'),
      view: this,
    });
    this.set('eventController', eventController);

    const shapeStateController = new ShapeStateController({
      view: this,
    });
    this.set('shapeStateController', shapeStateController);

    const legendController = new LegendController({ view: this });
    this.set('legendController', legendController);

    const annotationController = new AnnController({
      theme: this.get('theme'),
      view: this,
      frontgroundGroup: this.get('frontgroundGroup').addGroup(),
      backgroundGroup: this.get('backgroundGroup').addGroup(),
      // @ts-ignore
      options: options.annotations || [], // 支持配置项
    });
    this.set('annotationController', annotationController);

    const axisController = new AxisController({
      canvas,
      theme,
    });
    this.set('axisController', axisController);

    const tooltipController = new TooltipController({
      view: this,
      theme,
    });
    this.set('tooltipController', tooltipController);
  }

  private _initScale(field: string, data: any[] = []) {
    const scales = this.get('scales');
    // const parent = this.get('parent');
    let scale = scales[field];
    let _data = data;
    // let scale = scales[field];

    // const filteredData = this.get('filteredData'); // 过滤后的数据
    const legendFields = this._getLegendFields();
    // 过滤导致数据为空或者 field 字2段参与了图例生成，都使用全局数据，使图例过滤前后图形映射通道保持一致
    if (!_data.length || legendFields.indexOf(field) !== -1) {
      _data = this.get('data') || [];
    }

    const scaleController: ScaleController = this.get('scaleController');
    if (!scale) {
      scale = scaleController.createScale(field, _data);
      // TODO due with scale syncing, etc.
      scales[field] = scale; // 存储至 scales 变量中
    }
    return scale;
  }

  private _createElement(cfg) {
    const type = cfg.type;
    let element;
    if (this[type]) {
      const elementCfg = {
        ...cfg,
        container: this.get('panelGroup').addGroup(),
        frontgroundGroup: this.get('frontgroundGroup').addGroup(),
        view: this,
        canvas: this.get('canvas'),
        theme: this.get('theme'),
      };
      const ElementCtor = getElement(type);
      element = new ElementCtor(elementCfg);
      _.each(cfg, (v, k) => {
        if (element[k]) {
          element[k](v); // 只支持 options
        }
      });
      this._addElement(element);
    }
  }

  private _addElement(element: Element) {
    const elements = this.get('elements');
    elements.push(element);
    element.bindStates();
  }

  private _drawElements() {
    this.emit('beforedrawelements');
    _.each(this.get('elements'), (element: Element) => {
      element.paint();
    });
    this.emit('afterdrawelements');
  }

  private _clearElements() {
    _.each(this.get('elements'), (element: Element) => {
      element.clear();
    });
  }

  private _destroyElements() {
    const elements = this.get('elements');
    while (elements.length > 0) {
      const element = elements.shift();
      element.destroy();
    }
  }

  private _clearInner() {
    this.set('scales', {});
    this.emit('beforeclearinner');
    const options = this.get('options');
    options.elements = [];
    this._clearElements();

    // clear facet
    const facet: Facet = this.get('facet');
    if (facet) facet.clear();

    const annotationController: AnnController = this.get('annotationController');
    annotationController && annotationController.reset();

    const axisController = this.get('axisController');
    axisController && axisController.clear();

    const tooltipController = this.get('tooltipController');
    tooltipController && tooltipController.clear();

    // 当不需要保留图例的时候，需要将图例清空，否则 legend 还会残留
    if (!this.get('keepLegend')) {
      const legendController = this.get('legendController');
      legendController && legendController.clear();
    }

    // _addBackShape() 在 render() 方法中调用，为了防止重复创建，需要清空
    const backgroundGroup = this.get('backgroundGroup');
    const panelGroup = this.get('panelGroup');
    backgroundGroup.get('backShape') && backgroundGroup.get('backShape').remove();
    panelGroup.get('backShape') && panelGroup.get('backShape').remove();

    this.emit('afterclearinner');
  }

  private _beforeRender() {
    _.each(this.get('views'), (view: View) => {
      view._beforeRender();
    });
    this._initView();
  }

  private _initView() {
    this._execFilters();
    this._initCoord();
    this.emit('beforeinitelements');
    this._initElements();
    this._adjustScales();
  }

  private _initCoord() {
    const panelRange = this.get('panelRange');
    const coordController: CoordController = this.get('coordController');
    const coord = coordController.createCoord(panelRange.bl, panelRange.tr);
    this.set('coord', coord);
  }

  private _getScales(dim: 'x' | 'y') {
    const elements: Element[] = this.get('elements');
    return _.reduce(
      elements,
      (result, element) => {
        const scale: Scale = dim === 'x' ? element.getXScale() : element.getYScale();
        if (scale && !_.has(result, scale.field)) {
          result[scale.field] = scale;
        }
        return result;
      },
      {} as Record<string, Scale>,
    );
  }

  private _initElements() {
    const filteredData = this.get('filteredData');
    const coord = this.get('coord');
    const viewId = this.get('id');
    const options = this.get('options');
    const animate = this.get('animate');
    const widthRatio = this.get('widthRatio');
    const isShareTooltip = options.tooltip && options.tooltip.shared;

    _.each(this.get('elements'), (element: Element, i: number) => {
      element.set('data', filteredData);
      element.set('coord', coord);
      element.set('id', `${viewId}-element-${i}`);
      element.set('animate', animate);
      element.set('widthRatio', _.deepMix({}, widthRatio, element.get('widthRatio')));
      _.isBoolean(isShareTooltip) && element.set('shareTooltip', isShareTooltip);
      element.init();
    });
  }

  private _adjustScales() {
    // 调整分类度量的 range 属性
    this._adjustCategoryScalesRange();

    // 特殊逻辑：柱状图数值轴默认从 0 开始
    const elements = this.get('elements');
    const scaleDefs = this.get('scaleController').defs;
    elements.forEach((element) => {
      if (element.get('type') === 'interval') {
        const yScale = element.getYScale();
        const { field, min, max, type } = yScale;
        // 如果用户使用 view.scale() 自己定义了 min，则以用户的为准
        // time 类型不做调整
        if (!(scaleDefs[field] && scaleDefs[field].min) && type !== 'time') {
          if (min > 0) {
            yScale.change({
              min: 0,
            });
          } else if (max <= 0) { // 当柱状图全为负值时也需要从 0 开始生长
            yScale.change({
              max: 0,
            });
          }
        }
      }
    });
  }

  // 调整 x y 两个维度分类度量的 range 属性
  private _adjustCategoryScalesRange() {
    const coord = this.get('coord');
    const xScale = this.getXScale();
    const yScales = this.getYScales();
    const widthRatio = this.get('widthRatio');

    let scales = [];
    xScale && scales.push(xScale); // 一维图表没有 x 度量
    scales = scales.concat(yScales);
    const inFullCircle = isFullCircle(coord);
    const scaleController = this.get('scaleController');
    const scaleDefs = scaleController.defs;

    scales.forEach((scale) => {
      const { field, values } = scale;
      // 分类或者常量度量，同时用户没有通过 view.scale() 配置 range 属性
      if ((scale.isCategory || scale.isIdentity) && values && !(scaleDefs[field] && scaleDefs[field].range)) {
        const count = values.length;
        let range: [ number, number ];
        if (count === 1) {
          range = [ 0.5, 1 ]; // 只有一个分类时,防止计算出现 [ 0.5,0.5 ] 的状态
        } else {
          let wr = 1;
          let offset = 0;
          if (inFullCircle) {
            if (!coord.isTransposed) {
              range = [ 0, 1 - 1 / count ];
            } else {
              wr = widthRatio.multiplePie;
              offset = 1 / count * wr;
              range = [ offset / 2, 1 - offset / 2 ];
            }
          } else {
            offset = 1 / count * 1 / 2; // 两边留下分类空间的一半
            range = [ offset, 1 - offset ]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
          }
        }
        scale.range = range;
      }
    });
  }

  // 过滤数据
  private _execFilters() {
    const data = this.get('data');
    let result = this.get('data') || [];
    const filters = this._getFilters();
    if (filters) {
      result = result.filter((obj) => {
        let rst = true;
        _.each(filters, (callback: Function, field: string) => {
          if (callback) {
            rst = callback(obj[field], obj);
            if (!rst) {
              return false;
            }
          }
        });
        return rst;
      });
    }
    this.set('filteredData', result);
  }

  private _addBackShape() {
    // TODO：再飞，有没有更好的办法？
    // add backgroundGroup backShape
    const backgroundGroup = this.get('backgroundGroup');
    const viewRange = this.get('viewRange');
    const backShapeAttrs = {
      x: viewRange.x,
      y: viewRange.y,
      width: viewRange.width,
      height: viewRange.height,
      fill: 'rgba(255,255,255,0)',
    };
    const backgroundStyle = _.mix(this.get('theme').backgroundStyle, this.get('backgroundStyle'));
    const backgroundBackShape = backgroundGroup.addShape('rect', {
      attrs: _.mix(backShapeAttrs, backgroundStyle), // TODO backgroundStyle & theme
      zIndex: -1,
    });
    backgroundGroup.set('backShape', backgroundBackShape);
    backgroundGroup.sort();

    // add panelGroup backShape
    const panelGroup = this.get('panelGroup');
    const panelRange = this.get('panelRange');
    const panelBackShape = panelGroup.addShape('rect', {
      attrs:{
        x: panelRange.x,
        y: panelRange.y,
        width: panelRange.width,
        height: panelRange.height,
        fill: 'rgba(255,255,255,0)',
      },
      zIndex: -1,
    });
    panelGroup.set('backShape', panelBackShape);
    panelGroup.sort();
  }

  private _destroyViewGroups() {
    this.get('frontgroundGroup').remove();
    this.get('backgroundGroup').remove();
    this.get('panelGroup').remove();

    this.set('frontgroundGroup', null);
    this.set('backgroundGroup', null);
    this.set('panelGroup', null);
  }

  private _canvasDraw(stopDrawing?: boolean) {
    const canvas =  this.get('canvas');
    if (!stopDrawing) {
      const views = this.get('views');
      // sorting
      if (this.get('animate')) {
        // start animation
        const isUpdate = this.get('isUpdate');
        _.each(views, (view) => {
          Animate.execAnimation(view, isUpdate);
        });
        Animate.execAnimation(this, isUpdate);

        canvas.draw();
      } else {
        canvas.draw();
      }
    }
  }

  private _renderLegend() {
    const legendController = this.get('legendController');
    legendController.render();
  }

  private _renderAnnotations() {
    const coord = this.get('coord');
    const annotationController: AnnController = this.get('annotationController');
    annotationController.xScales = this._getScales('x');
    annotationController.yScales = this._getScales('y');

    annotationController.render(coord);
  }

  private _getLegendFields() {
    let fields = [];
    const elements = this.get('elements');
    elements.forEach((element) => {
      const elementFields = element.getLegendFields();
      fields = fields.concat(elementFields);
    });

    return _.uniq(fields);
  }

  // interaction相关
  private _setInteraction(type: string, interaction: Interaction) {
    const interactions = this.get('interactions');
    if (interactions[type]) {
      interactions[type].destroy();
    }
    interactions[type] = interaction;
  }
}

// TODO mixin element methods
export const registerViewPrototype = (key: string, Ctor: ElementConstructor) => {
  View.prototype[key] = function (cfg: DataPointType = {}) {
    cfg.view = this;
    cfg.theme = this.get('theme');
    cfg.container = this.get('panelGroup').addGroup();
    cfg.frontgroundGroup = this.get('frontgroundGroup').addGroup();
    cfg.canvas = this.get('canvas');
    const element = new Ctor(cfg);
    this._addElement(element);
    return element;
  };
};
