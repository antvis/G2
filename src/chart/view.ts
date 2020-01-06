import {
  clone,
  each,
  filter,
  find,
  flatten,
  get,
  isBoolean,
  isFunction,
  isNil,
  isObject,
  isString,
  map,
  remove,
  set,
  size,
  uniq,
  uniqueId,
} from '@antv/util';
import Base from '../base';
import { GROUP_Z_INDEX, LAYER, PLOT_EVENTS, VIEW_LIFE_CIRCLE } from '../constant';
import { Attribute, Coordinate, Event as GEvent, ICanvas, IGroup, IShape, Scale } from '../dependents';
import { Facet, getFacet } from '../facet';
import { FacetCfgMap } from '../facet/interface';
import Geometry from '../geometry/base';
import { createInteraction, Interaction } from '../interaction/';
import { Data, Datum, LooseObject, Padding, Point, Region, ScaleOption, ViewPadding } from '../interface';
import { BBox } from '../util/bbox';
import { isFullCircle, isPointInCoordinate } from '../util/coordinate';
import { createCoordinate } from '../util/coordinate';
import { mergeTheme } from '../util/theme';
import Chart from './chart';
import { getComponentController, getComponentControllerNames } from './controller';
import AnnotationComponent, { BaseOption as AnnotationBaseOption } from './controller/annotation';
import { Controller } from './controller/base';
import TooltipComponent from './controller/tooltip';
import Event from './event';
import {
  AxisOption,
  ComponentOption,
  CoordinateCfg,
  CoordinateOption,
  FilterCondition,
  GeometryOption,
  InteractionOption,
  LegendOption,
  Options,
  TooltipOption,
  ViewCfg,
  ViewOption,
} from './interface';
import defaultLayout, { Layout } from './layout';
import { ScalePool } from './util/scale-pool';

/**
 * view container of G2
 */
export class View extends Base {
  /** view id，全局唯一 */
  public id: string = uniqueId('view');
  /** 父级 view，如果没有父级，则为空 */
  public parent: View;
  /** 所有的子 view */
  public views: View[] = [];
  /** 所有的 geometry 实例 */
  public geometries: Geometry[] = [];
  /** 所有的组件 controllers */
  public controllers: Controller[] = [];
  /** 所有的 Interaction 实例 */
  public interactions: Record<string, Interaction> = {};

  /** view 实际的绘图区域，除去 padding，出去组件占用空间 */
  public viewBBox: BBox;
  /** 图形区域的大小 */
  // public plotBBox: BBox;
  /** 坐标系的位置大小 */
  public coordinateBBox: BBox;

  public canvas: ICanvas;

  // 三层 Group 图层
  /** 背景层 */
  public backgroundGroup: IGroup;
  /** 中间层 */
  public middleGroup: IGroup;
  /** 前景层 */
  public foregroundGroup: IGroup;
  /** view 的 padding 大小 */
  public padding: ViewPadding;

  /** 标记 view 的大小位置范围，均是 0 ~ 1 范围，便于开发者使用 */
  protected region: Region;
  /** 主题配置 */
  protected themeObject: object;

  /** 用于捕获 view event 的 rect shape */
  private viewEventCaptureRect: IShape;
  /** 配置开启的组件插件，默认为全局配置的组件 */
  private usedControllers: string[] = getComponentControllerNames();

  // 配置信息存储
  protected options: Options = {
    data: [],
    animate: true, // 默认开启动画
  }; // 初始化为空

  // 过滤之后的数据
  protected filteredData: Data;

  /** 所有的 scales */
  private scalePool: ScalePool = new ScalePool();

  // 布局函数
  protected layoutFunc: Layout = defaultLayout;
  // 生成的坐标系实例
  protected coordinateInstance: Coordinate;
  // 分面类实例
  protected facetInstance: Facet;

  /** 当前鼠标是否在 plot 内（CoordinateBBox） */
  private isPreMouseInPlot: boolean = false;
  // tooltip 是否被锁定
  private tooltipLocked: boolean;

  constructor(props: ViewCfg) {
    super({ visible: props.visible });

    const {
      parent,
      canvas,
      backgroundGroup,
      middleGroup,
      foregroundGroup,
      region = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      padding,
      theme,
      options,
    } = props;

    this.parent = parent;
    this.canvas = canvas;
    this.backgroundGroup = backgroundGroup;
    this.middleGroup = middleGroup;
    this.foregroundGroup = foregroundGroup;
    this.region = region;
    this.padding = padding;
    this.themeObject = mergeTheme({}, theme);
    // 接受父 view 传入的参数
    this.options = { ...this.options, ...options };

    this.init();
  }

  /**
   * 添加一个 geometry 到画布
   * @param geometry
   * @returns void
   */
  public addGeometry(geometry: Geometry) {
    this.geometries.push(geometry);
  }

  /**
   * 设置 layout 函数
   * @param layout
   * @returns void
   */
  public setLayout(layout: Layout) {
    this.layoutFunc = layout;
  }

  /**
   * 生命周期：初始化
   * @returns voids
   */
  public init() {
    // 计算画布的 viewBBox
    this.calculateViewBBox();
    // 创建一个透明的背景 rect，用于捕获事件
    this.createViewEventCaptureRect();

    // 事件委托机制
    this.initEvents();

    // 初始化组件 controller
    this.initComponentController();

    this.initOptions();

    // 递归初始化子 view
    each(this.views, (view: View) => {
      view.init();
    });
  }

  /**
   * 生命周期：渲染流程，渲染过程需要处理数据更新的情况
   * render 函数仅仅会处理 view 和子 view
   * @returns void
   */
  public render(isUpdate: boolean = false) {
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_RENDER);
    // 递归渲染
    this.renderRecursive(isUpdate);
    this.emit(VIEW_LIFE_CIRCLE.AFTER_RENDER);

    if (this.visible === false) {
      // 用户在初始化的时候声明 visible: false
      this.changeVisible(false);
    }
  }

  /**
   * 生命周期：清空，之后可以再走 init 流程，正常使用
   * @returns void
   */
  public clear() {
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_CLEAR);
    // 1. 清空缓存和计算数据
    this.scalePool.clear();
    this.filteredData = [];
    this.coordinateInstance = undefined;

    // 2. 清空 geometries
    each(this.geometries, (geometry: Geometry) => {
      geometry.clear();
    });
    this.geometries = [];

    // 3. 清空 controllers
    each(this.controllers, (controller: Controller) => {
      controller.clear();
    });

    // 递归处理子 view
    each(this.views, (view: View) => {
      view.clear();
    });

    this.emit(VIEW_LIFE_CIRCLE.AFTER_CLEAR);
  }

  /**
   * 生命周期：销毁，完全无法使用
   * @returns void
   */
  public destroy() {
    // 销毁前事件，销毁之后已经没有意义了，所以不抛出事件
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_DESTROY);
    const interactions = this.interactions;
    // 销毁 interactions
    each(interactions, (interaction) => {
      if (interaction) {
        // 有可能已经销毁，设置了 undefined
        interaction.destroy();
      }
    });
    this.clear();
    this.viewEventCaptureRect.remove(true);

    // 销毁 controller 中的组件
    each(this.controllers, (controller: Controller) => {
      controller.destroy();
    });

    this.backgroundGroup.remove(true);
    this.middleGroup.remove(true);
    this.foregroundGroup.remove(true);

    super.destroy();
  }
  /* end 生命周期函数 */

  public changeVisible(visible: boolean) {
    super.changeVisible(visible);
    this.geometries.forEach((geometry: Geometry) => {
      geometry.changeVisible(visible);
    });
    this.controllers.forEach((controller: Controller) => {
      controller.changeVisible(visible);
    });

    this.foregroundGroup.set('visible', visible);
    this.middleGroup.set('visible', visible);
    this.backgroundGroup.set('visible', visible);

    // set('visible', visible) 不会触发自动刷新
    this.getCanvas().draw();
  }

  /**
   * 装载数据
   *
   * ```ts
   * view.data([{ city: '杭州', sale: 100 }, { city: '上海', sale: 110 } ]);
   * ```
   *
   * @param data
   * @returns View
   */
  public data(data: Data): View {
    set(this.options, 'data', data);

    return this;
  }

  /**
   * 设置数据筛选配置
   *
   * ```ts
   * view.filter('city', (value: any, datum: Datum) => value !== '杭州');
   *
   * // delete the filter on city field
   * view.filter('city', null);
   * ```
   *
   * @param field
   * @param condition
   * @returns View
   */
  public filter(field: string, condition: FilterCondition | null): View {
    if (isFunction(condition)) {
      set(this.options, ['filters', field], condition);
      return this;
    }
    // condition 为空，则表示删除过滤条件
    if (!condition && get(this.options, ['filters', field])) {
      delete this.options.filters[field];
    }

    return this;
  }

  /**
   * 设置 axis 组件的配置
   *
   * ```ts
   * view.axis(false);
   *
   * view.axis('city', false);
   *
   * view.axis('city', {
   *   title: false,
   * });
   * ```
   *
   * @param field
   * @returns View
   */
  public axis(field: boolean): View;
  public axis(field: string, axisOption: AxisOption): View;
  public axis(field: string | boolean, axisOption?: AxisOption): View {
    if (isBoolean(field)) {
      set(this.options, ['axes'], field);
    } else {
      set(this.options, ['axes', field], axisOption);
    }

    return this;
  }

  /**
   * 设置图例配置
   *
   * ```ts
   * view.legend(false);
   *
   * view.legend('city', false);
   *
   * view.legend('city', {
   *   position: 'right',
   * });
   * ```
   *
   * @param field
   * @returns View
   */
  public legend(field: LegendOption): View;
  public legend(field: string, legendOption: LegendOption): View;
  public legend(field: string | LegendOption, legendOption?: LegendOption): View {
    if (isBoolean(field)) {
      set(this.options, ['legends'], field);
    } else if (isString(field)) {
      set(this.options, ['legends', field], legendOption);
    } else {
      // 设置全局的 legend 配置
      set(this.options, ['legends'], field);
    }

    return this;
  }

  /**
   * 批量设置 scale 配置
   *
   * ```ts
   * view.scale({
   *   sale: {
   *     min: 0,
   *     max: 100,
   *   }
   * });
   * ```
   *
   * @returns void
   */
  public scale(field: Record<string, ScaleOption>): View;
  /**
   * 设置 scale 配置
   *
   * ```ts
   * view.scale('sale', {
   *   min: 0,
   *   max: 100,
   * });
   * ```
   *
   * @returns void
   */
  public scale(field: string, scaleOption: ScaleOption): View;
  public scale(field: string | Record<string, ScaleOption>, scaleOption?: ScaleOption): View {
    if (isString(field)) {
      set(this.options, ['scales', field], scaleOption);
    } else if (isObject(field)) {
      each(field, (v: ScaleOption, k: string) => {
        set(this.options, ['scales', k], v);
      });
    }

    return this;
  }

  /**
   * tooltip configuration
   *
   * ```typescript
   * chart.tooltip(false); // turn off tooltip
   *
   * chart.tooltip({
   *   shared: true
   * });
   * ```
   *
   * @param cfg
   * @returns
   */
  public tooltip(cfg: boolean | TooltipOption): View {
    set(this.options, 'tooltip', cfg);

    return this;
  }

  /**
   * 辅助标记配置
   */
  public annotation(): AnnotationComponent {
    return this.getController('annotation') as AnnotationComponent;
  }

  /**
   * 设置坐标系配置
   *
   * ```ts
   * // 直角坐标系，并进行转置变换
   * view.coordinate('rect').transpose();
   *
   * // 默认创建直角坐标系
   * view.coordinate();
   * ```
   *
   * @param option
   * @returns [[Coordinate]]
   */
  public coordinate(option?: CoordinateOption): Coordinate;
  public coordinate(type: string, coordinateCfg?: CoordinateCfg): Coordinate;
  public coordinate(type: string | CoordinateOption, coordinateCfg?: CoordinateCfg): Coordinate {
    // 提供语法糖，使用更简单
    if (isString(type)) {
      set(this.options, 'coordinate', { type, cfg: coordinateCfg } as CoordinateOption);
    } else {
      set(this.options, 'coordinate', type);
    }

    // 创建一个 coordinate 实例
    this.createCoordinate(this.viewBBox);

    return this.coordinateInstance;
  }

  /**
   * view 分面绘制
   *
   * ```ts
   * view.facet('rect', {
   *   rowField: 'province',
   *   columnField: 'category',
   *   eachView: (innerView: View, facet?: FacetData) => {
   *     innerView.line().position('city*sale');
   *   },
   * });
   * ```
   *
   * @param type
   * @param cfg
   * @returns View
   */
  public facet<T extends keyof FacetCfgMap>(type: T, cfg: FacetCfgMap[T]) {
    // 先销毁掉之前的分面
    if (this.facetInstance) {
      this.facetInstance.destroy();
    }

    // 创建新的分面
    const Ctor = getFacet(type);

    if (!Ctor) {
      throw new Error(`facet '${type}' is not exist!`);
    }

    this.facetInstance = new Ctor(this, { ...cfg, type });

    return this;
  }

  /*
   * 开启或者关闭动画
   *
   * ```ts
   * view.animate(false);
   * ```
   *
   * @param status 动画状态，true 表示开始，false 表示关闭
   * @returns View
   */
  public animate(status: boolean): View {
    set(this.options, 'animate', status);
    return this;
  }

  /**
   * 更新配置项，用于配置项式声明
   * @param options 配置项
   */
  public updateOptions(options: Options) {
    this.options = {
      data: [],
      animate: true, // 默认开启动画
      ...options,
    };
    this.initOptions();
    return this;
  }

  /**
   * 设置 option 配置
   * @param name
   * @param opt
   * @returns view
   */
  public option(name: string, opt: any): View {
    // 对于内置的 option，避免覆盖。
    // name 在原型上，说明可能是内置 API，存在 option 被覆盖的风险，不处理
    if (View.prototype[name]) {
      throw new Error(`Can't built in variable name "${name}", please change another one.`);
    }

    // 存入到 option 中
    set(this.options, name, opt);
    return this;
  }

  /**
   * 设置主题
   *
   * ```ts
   * view.theme('dark');
   *
   * view.theme({ defaultColor: 'red' });
   * ```
   *
   * @param theme
   * @returns View
   */
  public theme(theme: string | object): View {
    this.themeObject = mergeTheme(this.themeObject, theme);

    return this;
  }

  /* end 一系列传入配置的 API */

  /**
   * Call the interaction based on the interaction name
   *
   * ```ts
   * view.interaction('my-interaction', { extra: 'hello world' });
   * ```
   *
   * @param name interaction name
   * @param cfg interaction config
   * @returns
   */
  public interaction(name: string, cfg?: LooseObject): View {
    const existInteraction = this.interactions[name];
    // 存在则先销毁已有的
    if (existInteraction) {
      existInteraction.destroy();
    }

    // 新建交互实例
    const interaction = createInteraction(name, this, cfg);
    if (interaction) {
      interaction.init();
      this.interactions[name] = interaction;
    }
    return this;
  }

  /**
   * 移除当前 View 的 interaction
   * ```ts
   * view.removeInteraction('my-interaction');
   * ```
   * @param name interaction name
   */
  public removeInteraction(name: string) {
    const existInteraction = this.interactions[name];
    // 存在则先销毁已有的
    if (existInteraction) {
      existInteraction.destroy();
      this.interactions[name] = undefined;
    }
  }

  /**
   * 修改数据，数据更新逻辑，数据更新仅仅影响当前这一层的 view
   *
   * ```ts
   * view.changeData([{ city: '北京', sale: '200' }]);
   * ```
   *
   * @param data
   * @returns void
   */
  public changeData(data: Data) {
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA);
    // 1. 保存数据
    this.data(data);

    // 2. 渲染
    this.paint(true);

    // 3. 遍历子 view 进行 change data
    each(this.views, (view: View) => {
      // FIXME 子 view 有自己的数据的情况，该如何处理？
      view.changeData(data);
    });

    this.emit(VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA);
  }

  /* View 管理相关的 API */

  /**
   * 创建子 view
   *
   * ```ts
   * const innerView = view.createView({
   *   start: { x: 0, y: 0 },
   *   end: { x: 0.5, y: 0.5 },
   *   padding: 8,
   * });
   * ```
   *
   * @param cfg
   * @returns View
   */
  public createView(cfg?: Partial<ViewCfg>): View {
    // 子 view 共享 options 配置数据
    const sharedOptions = {
      data: this.options.data,
      scales: clone(this.options.scales),
      axes: clone(this.options.axes),
      coordinate: clone(this.options.coordinate), // 该配置不包含坐标系变换的操作
      tooltip: clone(this.options.tooltip),
      legends: clone(this.options.legends),
      animate: this.options.animate,
      visible: this.visible,
    };

    const v = new View({
      parent: this,
      canvas: this.canvas,
      // 子 view 共用三层 group
      backgroundGroup: this.backgroundGroup.addGroup({ zIndex: GROUP_Z_INDEX.BG }),
      middleGroup: this.middleGroup.addGroup({ zIndex: GROUP_Z_INDEX.MID }),
      foregroundGroup: this.foregroundGroup.addGroup({ zIndex: GROUP_Z_INDEX.FORE }),
      theme: this.themeObject,
      padding: this.padding,
      ...cfg,
      options: {
        ...sharedOptions,
        ...get(cfg, 'options', {}),
      },
    });
    // 共享坐标系配置，如果用户未配置 coordinate，则直接使用父亲的 coordinate 实例
    v.coordinateInstance = this.getCoordinate();

    this.views.push(v);

    return v;
  }

  /**
   * 删除一个子 view
   * @param view
   * @return removedView
   */
  public removeView(view: View): View {
    const removedView = remove(this.views, (v: View) => v === view)[0];

    if (removedView) {
      removedView.destroy();
    }

    return removedView;
  }
  /* end View 管理相关的 API */

  // 一些 get 方法

  /**
   * 获取坐标系
   * @returns [[Coordinate]]
   */
  public getCoordinate() {
    return this.coordinateInstance;
  }

  /**
   * 获取当前 view 的主题配置
   * @returns themeObject
   */
  public getTheme(): object {
    return this.themeObject;
  }

  /**
   * 获得 x 轴字段的 scale 实例
   * @returns view 中 Geometry 对于的 x scale
   */
  public getXScale(): Scale {
    // 拿第一个 Geometry 的 X scale
    // 隐藏逻辑：一个 view 中的 Geometry 必须 x 字段一致
    const g = this.geometries[0];
    return g ? g.getXScale() : null;
  }

  /**
   * 获取 y 轴字段的 scales 实例
   * @returns view 中 Geometry 对于的 y scale 数组
   */
  public getYScales(): Scale[] {
    // 拿到所有的 Geometry 的 Y scale，然后去重
    return uniq(map(this.geometries, (g: Geometry) => g.getYScale()));
  }

  /**
   * get Scales object
   * @param dimType x | y
   * @returns scales object key by field
   */
  public getScalesByDim(dimType: 'x' | 'y'): Record<string, Scale> {
    const geometries = this.geometries;
    const scales = {};

    for (const geometry of geometries) {
      const scale = dimType === 'x' ? geometry.getXScale() : geometry.getYScale();
      if (scale && !scales[scale.field]) {
        scales[scale.field] = scale;
      }
    }

    return scales;
  }

  /**
   * 根据字段名去获取 scale
   * @param field
   * @param key
   */
  public getScaleByField(field: string, key?: string): Scale {
    const defaultKey = key ? key : this.getScaleKey(field);
    // 调用根节点 view 的方法获取
    return this.getRootView().scalePool.getScale(defaultKey);
  }

  /**
   * 返回所有配置信息
   * @returns 所有的 view API 配置
   */
  public getOptions(): Options {
    return this.options;
  }

  /**
   * 获取 view 的数据（过滤后的数据）
   * @returns 处理过滤器之后的数据
   */
  public getData() {
    return this.filteredData;
  }

  /**
   * 获得绘制的层级 group
   * @param layer
   * @returns 对应层级的 Group
   */
  public getLayer(layer: LAYER): IGroup {
    return layer === LAYER.BG
      ? this.backgroundGroup
      : layer === LAYER.MID
      ? this.middleGroup
      : layer === LAYER.FORE
      ? this.foregroundGroup
      : this.foregroundGroup;
  }

  /**
   * 对外暴露方法，判断一个点是否在 plot 内部
   * @param point
   */
  public isPointInPlot(point: Point): boolean {
    return isPointInCoordinate(this.getCoordinate(), point);
  }

  /**
   * 获得所有的 legend 对应的 attribute 实例
   * @returns 维度字段的 Attribute 数组
   */
  public getLegendAttributes(): Attribute[] {
    return (flatten(map(this.geometries, (g: Geometry) => g.getGroupAttributes())) as unknown) as Attribute[];
  }

  /**
   * 获取所有的分组字段的 scales
   * @returns 获得分组字段的 scales 数组
   */
  public getGroupScales(): Scale[] {
    // 拿到所有的 Geometry 的 分组字段 scale，然后打平去重
    const scales = map(this.geometries, (g: Geometry) => g.getGroupScales());
    return uniq(flatten(scales));
  }

  /**
   * 获取 G.Canvas 实例
   * @returns G.Canvas 画布实例
   */
  public getCanvas(): ICanvas {
    return ((this.getRootView() as unknown) as Chart).canvas;
  }

  /**
   * 获得根节点 view
   */
  public getRootView(): View {
    let v = this as View;

    while (true) {
      if (v.parent) {
        v = v.parent;
        continue;
      }
      break;
    }
    return v;
  }

  /**
   * get the canvas coordinate of the data
   * @param data
   * @returns
   */
  public getXY(data: Datum): Point {
    const coordinate = this.getCoordinate();
    const xScales = this.getScalesByDim('x');
    const yScales = this.getScalesByDim('y');
    let x;
    let y;

    each(data, (value, key) => {
      if (xScales[key]) {
        x = xScales[key].scale(value);
      }
      if (yScales[key]) {
        y = yScales[key].scale(value);
      }
    });

    if (!isNil(x) && !isNil(y)) {
      return coordinate.convert({ x, y });
    }
  }

  /**
   * get controller
   * @param name
   */
  public getController(name: string): Controller {
    return find(this.controllers, (c: Controller) => c.name === name);
  }

  /**
   * 显示 tooltip
   * @param point
   * @returns View
   */
  public showTooltip(point: Point): View {
    const tooltip = this.getController('tooltip') as TooltipComponent;
    if (tooltip) {
      tooltip.showTooltip(point);
    }
    return this;
  }

  /**
   * 隐藏 tooltip
   * @returns View
   */
  public hideTooltip(): View {
    const tooltip = this.getController('tooltip') as TooltipComponent;
    if (tooltip) {
      tooltip.hideTooltip();
    }
    return this;
  }

  /**
   * 将 tooltip 锁定到当前位置不能移动
   * @returns View
   */
  public lockTooltip(): View {
    this.tooltipLocked = true;
    return this;
  }

  /**
   * 将 tooltip 锁定解除
   * @returns View
   */
  public unlockTooltip(): View {
    this.tooltipLocked = false;
    return this;
  }

  /**
   * 是否锁定 tooltip
   * @returns 是否锁定
   */
  public isTooltipLocked() {
    return this.tooltipLocked;
  }

  /**
   * 获取 tooltip 数据项
   * @param point
   * @returns items of tooltip
   */
  public getTooltipItems(point: Point) {
    const tooltip = this.getController('tooltip') as TooltipComponent;

    return tooltip ? tooltip.getTooltipItems(point) : [];
  }

  /**
   * 获取所有的 pure component 组件，用于布局
   */
  public getComponents(): ComponentOption[] {
    const components = [];

    each(this.controllers, (controller: Controller) => {
      components.push(...controller.getComponents());
    });

    return components;
  }

  protected paint(isUpdate: boolean) {
    // 1. 处理数据
    this.filterData();
    // 2. 创建 coordinate 实例
    if (!this.coordinateInstance) {
      this.createCoordinate();
    }
    // 3. 初始化 Geometry
    this.initGeometries(isUpdate);
    // 4. 渲染组件 component
    this.renderComponents(isUpdate);
    // 5.  递归 views，进行布局
    this.doLayout();
    // 6. 渲染分面
    this.renderFacet();
    // 7. 布局完之后，coordinate 的范围确定了，调整 coordinate 组件
    this.adjustCoordinate();
    // 8. 渲染几何标记
    this.paintGeometries(isUpdate);
    // 9. 更新 viewEventCaptureRect 大小
    const { x, y, width, height } = this.viewBBox;
    this.viewEventCaptureRect.attr({ x, y, width, height });
  }

  /**
   * 递归 render views
   * 步骤非常繁琐，因为之间有一些数据依赖，所以执行流程上有先后关系
   */
  protected renderRecursive(isUpdate: boolean) {
    // 数据到完整图表的绘制
    this.paint(isUpdate);

    // 同样递归处理子 views
    each(this.views, (view: View) => {
      view.renderRecursive(isUpdate);
    });
  }
  // end Get 方法

  // 生命周期子流程——初始化流程

  /**
   * 计算 region，计算实际的像素范围坐标
   * @private
   */
  private calculateViewBBox() {
    let x;
    let y;
    let width;
    let height;

    if (this.parent) {
      const bbox = this.parent.coordinateBBox;
      // 存在 parent， 那么就是通过父容器大小计算
      x = bbox.x;
      y = bbox.y;
      width = bbox.width;
      height = bbox.height;
    } else {
      // 顶层容器，从 canvas 中取值 宽高
      x = 0;
      y = 0;
      width = this.canvas.get('width');
      height = this.canvas.get('height');
    }

    const { start, end } = this.region;

    // 根据 region 计算当前 view 的 bbox 大小。
    this.viewBBox = new BBox(
      x + width * start.x,
      y + height * start.y,
      width * (end.x - start.x),
      height * (end.y - start.y)
    );

    // 初始的 coordinate bbox 大小
    this.coordinateBBox = this.viewBBox;
  }

  /**
   * create an rect with viewBBox, for capture event
   */
  private createViewEventCaptureRect() {
    const { x, y, width, height } = this.viewBBox;

    this.viewEventCaptureRect = this.backgroundGroup.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        fill: 'rgba(255,255,255,0)',
      },
    }) as IShape;
  }

  /**
   * 初始化事件机制：G 4.0 底层内置支持 name:event 的机制，那么只要所有组件都有自己的 name 即可。
   *
   * G2 的事件只是获取事件委托，然后在 view 嵌套结构中，形成事件冒泡机制。
   * 当前 view 只委托自己 view 中的 Component 和 Geometry 事件，并向上冒泡
   * @private
   */
  private initEvents() {
    // 三层 group 中的 shape 事件都会通过 G 冒泡上来的
    this.foregroundGroup.on('*', this.onEvents);
    this.middleGroup.on('*', this.onEvents);
    this.backgroundGroup.on('*', this.onEvents);

    // 自己监听事件，然后向上冒泡
    this.on('*', this.onViewEvents);
  }

  /**
   * 初始化插件
   */
  private initComponentController() {
    each(this.usedControllers, (controllerName: string) => {
      const Ctor = getComponentController(controllerName);
      if (Ctor) {
        this.controllers.push(new Ctor(this));
      }
    });
  }

  /**
   * 触发事件之后
   * @param evt
   */
  private onEvents = (evt: GEvent): void => {
    // 阻止继续冒泡，防止重复事件触发
    evt.preventDefault();

    const { type, shape, name } = evt;

    const data = shape ? shape.get('origin') : null;
    // 事件在 view 嵌套中冒泡（暂不提供阻止冒泡的机制）
    const e = new Event(this, evt, data);
    e.type = name;

    // 包含有基本事件、组合事件
    this.emit(name, e);
    if (evt.delegateObject) {
      const events = this.getEvents();
      const currentTarget = evt.currentTarget as IShape;
      const inhertNames = currentTarget.get('inheritNames');
      each(inhertNames, (subName) => {
        const eventName = `${subName}:${type}`;
        if (events[eventName]) {
          this.emit(eventName, e);
        }
      });
    }

    // 处理 plot 事件
    this.doPlotEvent(e);
  };

  /**
   * 处理 PLOT_EVENTS
   * plot event 需要处理所有的基础事件，并判断是否在画布中，然后再决定是否要 emit。
   * 对于 mouseenter、mouseleave 比较特殊，需要做一下数学比较。
   * @param e
   */
  private doPlotEvent(e: Event) {
    const { type, x, y } = e;

    const point = { x, y };

    const ALL_EVENTS = [
      'mousedown',
      'mouseup',
      'mousemove',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'click',
      'dblclick',
      'contextmenu',
    ];

    if (ALL_EVENTS.includes(type)) {
      const currentInPlot = this.isPointInPlot(point);

      if (currentInPlot) {
        const TYPE = `plot:${type}`; // 组合 plot 事件
        e.type = TYPE;
        this.emit(TYPE, e);
      }

      // 对于 mouseenter, mouseleave 的计算处理
      if (type === 'mousemove') {
        if (this.isPreMouseInPlot && !currentInPlot) {
          e.type = PLOT_EVENTS.MOUSE_LEAVE;
          this.emit(PLOT_EVENTS.MOUSE_LEAVE, e);
        } else if (!this.isPreMouseInPlot && currentInPlot) {
          e.type = PLOT_EVENTS.MOUSE_ENTER;
          this.emit(PLOT_EVENTS.MOUSE_ENTER, e);
        }
        // 赋新的状态值
        this.isPreMouseInPlot = currentInPlot;
      }
    }
  }

  /**
   * 监听自己的 view 事件，然后向上传递，形成事件冒泡的机制
   * @param evt
   */
  private onViewEvents = (evt?: Event): void => {
    // 存在事件的时候才冒泡，否则可能是生命周期事件，暂时不冒泡
    // 因为 chart 上监听到很多的 view 生命周期事件，好像没有意义
    if (evt) {
      const { type } = evt;

      if (this.parent) {
        // 事件在 view 嵌套中冒泡（暂不提供阻止冒泡的机制）
        this.parent.emit(type, evt);
      }
    }
  };

  // view 生命周期 —— 渲染流程

  /**
   * 处理筛选器，筛选数据
   * @private
   */
  private filterData() {
    const { data, filters } = this.options;
    // 不存在 filters，则不需要进行数据过滤
    if (size(filters) === 0) {
      this.filteredData = data;
      return;
    }

    // 存在过滤器，则逐个执行过滤，过滤器之间是 与 的关系
    this.filteredData = filter(data, (datum: Datum) => {
      // 所有的 filter 字段
      const fields = Object.keys(filters);

      // 所有的条件都通过，才算通过
      return fields.every((field: string) => {
        const condition = filters[field];

        // condition 返回 true，则保留
        return condition(datum[field], datum);
      });
    });
  }

  /**
   * 初始化 Geometries
   * @private
   */
  private initGeometries(isUpdate: boolean) {
    // 初始化图形的之前，先创建 / 更新 scales
    this.createOrUpdateScales();
    // 实例化 Geometry，然后 view 将所有的 scale 管理起来
    each(this.geometries, (geometry: Geometry) => {
      // 保持 scales 引用不要变化
      geometry.scales = this.getGeometryScales();
      const cfg = {
        coordinate: this.getCoordinate(), // 使用 coordinate 引用，可以保持 coordinate 的同步更新
        scaleDefs: get(this.options, 'scales', {}),
        data: this.filteredData,
        theme: this.themeObject,
      };
      if (isUpdate) {
        // 数据发生更新
        geometry.update(cfg);
      } else {
        geometry.init(cfg);
      }
    });

    // Geometry 初始化之后，生成了 scale，然后进行调整 scale 配置
    this.adjustScales();
  }

  /**
   * 根据 Geometry 的所有字段创建 scales
   * 如果存在，则更新，不存在则创建
   */
  private createOrUpdateScales() {
    const fields = this.getScaleFields();
    const groupedFields = this.getGroupedFields();

    const { data, scales } = this.getOptions();
    const filteredData = this.filteredData;

    each(fields, (field: string) => {
      const scaleDef = get(scales, [field]);

      // 调用方法，递归去创建
      this.createScale(
        field,
        // 分组字段的 scale 使用未过滤的数据创建
        groupedFields.includes(field) ? data : filteredData,
        scaleDef
      );
    });
  }

  /**
   * 创建 scale，递归到顶层 view 去创建和缓存 scale
   * @param field
   * @param data
   * @param scaleDef
   * @param key
   */
  protected createScale(field: string, data: Data, scaleDef: ScaleOption, key?: string): Scale {
    // 1. 合并 field 对应的 scaleDef，合并原则是底层覆盖顶层（就近原则）
    const currentScaleDef = get(this.options.scales, [field]);
    const mergedScaleDef = { ...currentScaleDef, ...scaleDef };

    // 2. 生成默认的 key
    const defaultKey = key ? key : this.getScaleKey(field);

    // 3. 是否存在父 view，在则递归，否则创建
    if (this.parent) {
      return this.parent.createScale(field, data, mergedScaleDef, defaultKey);
    }

    // 4. 在根节点 view 通过 scalePool 创建
    return this.scalePool.createScale(field, data, mergedScaleDef, defaultKey);
  }

  /**
   * 处理 scale 同步逻辑
   */
  private syncScale() {
    // 最终调用 root view 的
    this.getRootView().scalePool.sync();
  }

  /**
   * 获得 Geometry 中的 scale 对象
   */
  private getGeometryScales(): Record<string, Scale> {
    const fields = this.getScaleFields();

    const scales = {};

    each(fields, (field: string) => {
      scales[field] = this.getScaleByField(field);
    });

    return scales;
  }

  private getScaleFields() {
    const fields = this.geometries.reduce((r: string[], geometry: Geometry): string[] => {
      r.push(...geometry.getScaleFields());
      return r;
    }, []);

    return uniq(fields);
  }

  private getGroupedFields() {
    const fields = this.geometries.reduce((r: string[], geometry: Geometry): string[] => {
      r.push(...geometry.getGroupFields());
      return r;
    }, []);

    return uniq(fields);
  }

  /**
   * 调整 scale 配置
   * @private
   */
  private adjustScales() {
    // 调整目前包括：
    // 分类 scale，调整 range 范围
    this.adjustCategoryScaleRange();
    // 处理 sync scale 的逻辑
    this.syncScale();
  }

  /**
   * 调整分类 scale 的 range，防止超出坐标系外面
   * @private
   */
  private adjustCategoryScaleRange() {
    const xyScales = [this.getXScale(), ...this.getYScales()].filter((e) => !!e);
    const coordinate = this.getCoordinate();
    const scaleOptions = this.options.scales;

    each(xyScales, (scale: Scale) => {
      // @ts-ignore
      const { field, values, isCategory, isIdentity } = scale;

      // 分类或者 identity 的 scale 才进行处理
      if (isCategory || isIdentity) {
        // 存在 value 值，且用户没有配置 range 配置
        if (values && !get(scaleOptions, [field, 'range'])) {
          const count = values.length;
          let range;

          if (count === 1) {
            range = [0.5, 1]; // 只有一个分类时,防止计算出现 [0.5,0.5] 的状态
          } else {
            let widthRatio = 1;
            let offset = 0;

            if (isFullCircle(coordinate)) {
              if (!coordinate.isTransposed) {
                range = [0, 1 - 1 / count];
              } else {
                widthRatio = get(this.theme, 'widthRatio.multiplePie', 1 / 1.3);
                offset = (1 / count) * widthRatio;
                range = [offset / 2, 1 - offset / 2];
              }
            } else {
              offset = 1 / count / 2; // 两边留下分类空间的一半
              range = [offset, 1 - offset]; // 坐标轴最前面和最后面留下空白防止绘制柱状图时
            }
          }
          // 更新 range
          scale.range = range;
        }
      }
    });
  }

  /**
   * 根据 options 配置、Geometry 字段配置，自动渲染 components
   * @param isUpdate 是否是更新
   * @private
   */
  private renderComponents(isUpdate: boolean) {
    // 先全部清空，然后 render
    each(this.controllers, (controller: Controller) => {
      // 更新则走更新逻辑；否则清空载重绘
      if (isUpdate) {
        controller.update();
      } else {
        controller.clear();
        controller.render();
      }
    });
  }

  private doLayout() {
    this.layoutFunc(this);
  }

  /**
   * 创建坐标系
   * @private
   */
  private createCoordinate(bbox?: BBox) {
    this.coordinateInstance = createCoordinate(this.options.coordinate, bbox || this.coordinateBBox);
  }

  /**
   * 调整 coordinate 的坐标范围
   */
  public adjustCoordinate() {
    this.coordinateInstance.update({
      start: this.coordinateBBox.bl,
      end: this.coordinateBBox.tr,
    });
  }

  /**
   * 根据 options 配置自动渲染 geometry
   * @private
   */
  private paintGeometries(isUpdate: boolean) {
    const doAnimation = this.options.animate;
    // geometry 的 paint 阶段
    this.geometries.map((geometry: Geometry) => {
      if (!doAnimation) {
        // 如果 view 不执行动画，那么 view 下所有的 geometry 都不执行动画
        geometry.animate(false);
      }
      geometry.paint(isUpdate);
    });
  }

  /**
   * 渲染分面，会在其中进行数据分面，然后进行子 view 创建
   */
  private renderFacet() {
    if (this.facetInstance) {
      // 计算分面数据
      this.facetInstance.init();
      // 渲染组件和 views
      this.facetInstance.render();
    }
  }

  private initOptions() {
    const { geometries = [], interactions = [], views = [], annotations = [] } = this.options;

    // 创建 geometry 实例
    geometries.forEach((geometryOption: GeometryOption) => {
      this.createGeometry(geometryOption);
    });

    // 创建 interactions 实例
    interactions.forEach((interactionOption: InteractionOption) => {
      const { type, cfg } = interactionOption;
      this.interaction(type, cfg);
    });

    // 创建 view 实例
    views.forEach((viewOption: ViewOption) => {
      this.createView(viewOption);
    });

    // 设置 annotation
    const annotationComponent = this.getController('annotation') as AnnotationComponent;
    annotations.forEach((annotationOption: AnnotationBaseOption) => {
      annotationComponent.annotation(annotationOption);
    });
  }

  private createGeometry(geometryOption: GeometryOption) {
    const { type, cfg = {} } = geometryOption;
    if (this[type]) {
      const geometry = this[type](cfg);
      each(geometryOption, (v, k) => {
        if (isFunction(geometry[k])) {
          geometry[k](v);
        }
      });
    }
  }

  /**
   * scale key 的创建方式
   * @param field
   */
  private getScaleKey(field: string): string {
    return `${this.id}-${field}`;
  }
}

/**
 * 注册 geometry 组件
 * @param name
 * @param Ctor
 * @returns Geometry
 */
export function registerGeometry(name: string, Ctor: any) {
  // 语法糖，在 view API 上增加原型方法
  View.prototype[name.toLowerCase()] = function(cfg: any = {}) {
    const props = {
      /** 图形容器 */
      container: this.middleGroup.addGroup({
        name: 'element',
      }),
      labelsContainer: this.foregroundGroup.addGroup(),
      ...cfg,
    };

    const geometry = new Ctor(props);
    this.addGeometry(geometry);

    return geometry;
  };
}

export default View;
