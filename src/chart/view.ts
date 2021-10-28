import {
  clone,
  deepMix,
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
  isUndefined,
  mix,
  remove,
  set,
  size,
  uniqueId,
  isEqual,
  isPlainObject,
  reduce,
} from '@antv/util';
import { Attribute, Coordinate, Event as GEvent, GroupComponent, ICanvas, IGroup, IShape, Scale } from '../dependents';
import {
  AxisOption,
  ComponentOption,
  CoordinateCfg,
  CoordinateOption,
  Data,
  Datum,
  FacetCfgMap,
  FilterCondition,
  GeometryOption,
  LegendOption,
  LooseObject,
  Options,
  Point,
  Region,
  ScaleOption,
  TooltipOption,
  ViewCfg,
  ViewPadding,
  ViewAppendPadding,
  EventPayload,
  Padding,
} from '../interface';
import { GROUP_Z_INDEX, LAYER, PLOT_EVENTS, VIEW_LIFE_CIRCLE } from '../constant';
import Base from '../base';
import { Facet, getFacet } from '../facet';
import Geometry from '../geometry/base';
import Element from '../geometry/element';
import { createInteraction, Interaction } from '../interaction';
import { getTheme } from '../theme';
import { BBox } from '../util/bbox';
import { getCoordinateClipCfg, isPointInCoordinate } from '../util/coordinate';
import { uniq } from '../util/helper';
import { findDataByPoint } from '../util/tooltip';
import { parsePadding } from '../util/padding';
import { getDefaultCategoryScaleRange } from '../util/scale';
import { createTheme } from '../theme/util';
import Chart from './chart';
import { getComponentController, getComponentControllerNames } from './controller';
import Annotation from './controller/annotation';
import { Controller } from './controller/base';
import CoordinateController from './controller/coordinate';
import Tooltip from './controller/tooltip';
import Slider from './controller/slider';
import Scrollbar from './controller/scrollbar';
import Axis from './controller/axis';
import Gesture from './controller/gesture';
import Legend from './controller/legend';
import Event from './event';
import defaultLayout, { Layout } from './layout';
import { ScalePool } from './util/scale-pool';
import { PaddingCal } from './layout/padding-cal';
import { calculatePadding } from './layout/auto';
import { defaultSyncViewPadding } from './util/sync-view-padding';

/**
 * G2 视图 View 类
 */
export class View extends Base {
  /** view id，全局唯一。 */
  public id: string;
  /** 父级 view，如果没有父级，则为空。 */
  public parent: View;
  /** 所有的子 view。 */
  public views: View[] = [];
  /** 所有的 geometry 实例。 */
  public geometries: Geometry[] = [];
  /** 所有的组件 controllers。 */
  public controllers: Controller[] = [];
  /** 所有的 Interaction 实例。 */
  public interactions: Record<string, Interaction> = {};

  /** view 区域空间。 */
  public viewBBox: BBox;
  /** 坐标系的位置大小，ViewBBox - padding = coordinateBBox。 */
  public coordinateBBox: BBox;
  /** view 的 padding 大小，传入的配置（不是解析之后的值）。 */
  public padding: ViewPadding;
  /** padding的基础上增加的调整值 */
  public appendPadding: ViewAppendPadding;
  /** G.Canvas 实例。 */
  public canvas: ICanvas;
  /** 存储最终计算的 padding 结果 */
  public autoPadding: PaddingCal;

  /** 三层 Group 图形中的背景层。 */
  public backgroundGroup: IGroup;
  /** 三层 Group 图形中的中间层。 */
  public middleGroup: IGroup;
  /** 三层 Group 图形中的前景层。 */
  public foregroundGroup: IGroup;
  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  public limitInPlot: boolean = false;

  /**
   * 标记 view 的大小位置范围，均是 0 ~ 1 范围，便于开发者使用，起始点为左上角。
   */
  protected region: Region;
  /** 主题配置，存储当前主题配置。 */
  protected themeObject: LooseObject;

  // 配置信息存储
  protected options: Options = {
    data: [],
    animate: true, // 默认开启动画
  }; // 初始化为空

  /** 过滤之后的数据 */
  protected filteredData: Data;

  /** 配置开启的组件插件，默认为全局配置的组件。 */
  private usedControllers: string[] = getComponentControllerNames();

  /** 所有的 scales */
  private scalePool: ScalePool = new ScalePool();

  /** 布局函数 */
  protected layoutFunc: Layout = defaultLayout;
  /** 生成的坐标系实例，{@link https://github.com/antvis/coord/blob/master/src/coord/base.ts|Coordinate} */
  protected coordinateInstance: Coordinate;
  /** Coordinate 相关的控制器类，负责坐标系实例的创建、更新、变换等 */
  protected coordinateController: CoordinateController;
  /** 分面类实例 */
  protected facetInstance: Facet;

  /** 当前鼠标是否在 plot 内（CoordinateBBox） */
  private isPreMouseInPlot: boolean = false;
  /** 默认标识位，用于判定数据是否更新 */
  private isDataChanged: boolean = false;
  /** 用于判断坐标系范围是否发生变化的标志位 */
  private isCoordinateChanged: boolean = false;
  /** 从当前这个 view 创建的 scale key */
  private createdScaleKeys = new Map<string, boolean>();
  /** 背景色样式的 shape */
  private backgroundStyleRectShape;
  /** 是否同步子 view 的 padding */
  private syncViewPadding;

  constructor(props: ViewCfg) {
    super({ visible: props.visible });

    const {
      id = uniqueId('view'),
      parent,
      canvas,
      backgroundGroup,
      middleGroup,
      foregroundGroup,
      region = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      padding,
      appendPadding,
      theme,
      options,
      limitInPlot,
      syncViewPadding,
    } = props;

    this.parent = parent;
    this.canvas = canvas;
    this.backgroundGroup = backgroundGroup;
    this.middleGroup = middleGroup;
    this.foregroundGroup = foregroundGroup;
    this.region = region;
    this.padding = padding;
    this.appendPadding = appendPadding;
    // 接受父 view 传入的参数
    this.options = { ...this.options, ...options };
    this.limitInPlot = limitInPlot;
    this.id = id;
    this.syncViewPadding = syncViewPadding;

    // 初始化 theme
    this.themeObject = isObject(theme) ? deepMix({}, getTheme('default'), createTheme(theme)) : getTheme(theme);
    this.init();
  }

  /**
   * 设置 layout 布局函数
   * @param layout 布局函数
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

    // 事件委托机制
    this.initEvents();

    // 初始化组件 controller
    this.initComponentController();

    this.initOptions();
  }

  /**
   * 生命周期：渲染流程，渲染过程需要处理数据更新的情况。
   * render 函数仅仅会处理 view 和子 view。
   * @param isUpdate 是否触发更新流程。
   * @param params render 事件参数
   */
  public render(isUpdate: boolean = false, payload?: EventPayload) {
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_RENDER, Event.fromData(this, VIEW_LIFE_CIRCLE.BEFORE_RENDER, payload));
    // 递归渲染
    this.paint(isUpdate);

    this.emit(VIEW_LIFE_CIRCLE.AFTER_RENDER, Event.fromData(this, VIEW_LIFE_CIRCLE.AFTER_RENDER, payload));

    if (this.visible === false) {
      // 用户在初始化的时候声明 visible: false
      this.changeVisible(false);
    }
  }

  /**
   * 生命周期：清空图表上所有的绘制内容，但是不销毁图表，chart 仍可使用。
   * @returns void
   */
  public clear() {
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_CLEAR);
    // 1. 清空缓存和计算数据
    this.filteredData = [];
    this.coordinateInstance = undefined;
    this.isDataChanged = false; // 复位
    this.isCoordinateChanged = false; // 复位

    // 2. 清空 geometries
    const geometries = this.geometries;
    for (let i = 0; i < geometries.length; i++) {
      geometries[i].clear();
      // view 中使用 geometry 的时候，还需要清空它的容器，不然下一次 chart.geometry() 的时候，又创建了一个，导致泄露， #2799。
      geometries[i].container.remove(true);
      geometries[i].labelsContainer.remove(true);
    }
    this.geometries = [];

    // 3. 清空 controllers
    const controllers = this.controllers;
    for (let i = 0; i < controllers.length; i++) {
      if (controllers[i].name === 'annotation') {
        // 需要清空配置项
        (controllers[i] as Annotation).clear(true);
      } else {
        controllers[i].clear();
      }
    }

    // 4. 删除 scale 缓存
    this.createdScaleKeys.forEach((v: boolean, k: string) => {
      this.getRootView().scalePool.deleteScale(k);
    });
    this.createdScaleKeys.clear();

    // 递归处理子 view
    const views = this.views;
    for (let i = 0; i < views.length; i++) {
      views[i].clear();
    }

    this.emit(VIEW_LIFE_CIRCLE.AFTER_CLEAR);
  }

  /**
   * 生命周期：销毁，完全无法使用。
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

    // 销毁 controller 中的组件
    const controllers = this.controllers;
    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i];
      controller.destroy();
    }

    this.backgroundGroup.remove(true);
    this.middleGroup.remove(true);
    this.foregroundGroup.remove(true);

    super.destroy();
  }
  /* end 生命周期函数 */

  /**
   * 显示或者隐藏整个 view。
   * @param visible 是否可见
   * @returns View
   */
  public changeVisible(visible: boolean): View {
    super.changeVisible(visible);

    const geometries = this.geometries;
    for (let i = 0, len = geometries.length; i < len; i++) {
      const geometry = geometries[i];
      geometry.changeVisible(visible);
    }

    const controllers = this.controllers;
    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i];
      controller.changeVisible(visible);
    }

    this.foregroundGroup.set('visible', visible);
    this.middleGroup.set('visible', visible);
    this.backgroundGroup.set('visible', visible);

    // group.set('visible', visible) 不会触发自动刷新
    this.getCanvas().draw();

    return this;
  }

  /**
   * 装载数据源。
   *
   * ```ts
   * view.data([{ city: '杭州', sale: 100 }, { city: '上海', sale: 110 } ]);
   * ```
   *
   * @param data 数据源，json 数组。
   * @returns View
   */
  public data(data: Data): View {
    set(this.options, 'data', data);
    this.isDataChanged = true;
    return this;
  }

  /**
   * @deprecated
   * This method will be removed at G2 V4.1. Replaced by {@link #data(data)}
   */
  public source(data: Data): View {
    console.warn('This method will be removed at G2 V4.1. Please use chart.data() instead.');
    return this.data(data);
  }

  /**
   * 设置数据筛选规则。
   *
   * ```ts
   * view.filter('city', (value: any, datum: Datum) => value !== '杭州');
   *
   * // 删除 'city' 字段对应的筛选规则。
   * view.filter('city', null);
   * ```
   *
   * @param field 数据字段
   * @param condition 筛选规则
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
   * 开启或者关闭坐标轴。
   *
   * ```ts
   *  view.axis(false); // 不展示坐标轴
   * ```
   * @param field 坐标轴开关
   */
  public axis(field: boolean): View;
  /**
   * 对特定的某条坐标轴进行配置。
   *
   * @example
   * ```ts
   * view.axis('city', false); // 不展示 'city' 字段对应的坐标轴
   *
   * // 将 'city' 字段对应的坐标轴的标题隐藏
   * view.axis('city', {
   *   title: null,
   * });
   * ```
   *
   * @param field 要配置的坐标轴对应的字段名称
   * @param axisOption 坐标轴具体配置，更详细的配置项可以参考：https://github.com/antvis/component#axis
   */
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
   * 对图例进行整体配置。
   *
   * ```ts
   * view.legend(false); // 关闭图例
   *
   * view.legend({
   *   position: 'right',
   * }); // 图例进行整体配置
   * ```
   * @param field
   * @returns View
   */
  public legend(field: LegendOption): View;
  /**
   * 对特定的图例进行配置。
   *
   * @example
   * ```ts
   * view.legend('city', false); // 关闭某个图例，通过数据字段名进行关联
   *
   * // 对特定的图例进行配置
   * view.legend('city', {
   *   position: 'right',
   * });
   * ```
   *
   * @param field 图例对应的数据字段名称
   * @param legendOption 图例配置，更详细的配置项可以参考：https://github.com/antvis/component#axis
   * @returns View
   */
  public legend(field: string, legendOption: LegendOption): View;
  public legend(field: string | LegendOption, legendOption?: LegendOption): View {
    if (isBoolean(field)) {
      set(this.options, ['legends'], field);
    } else if (isString(field)) {
      set(this.options, ['legends', field], legendOption);
      if (isPlainObject(legendOption) && legendOption?.selected) {
        set(this.options, ['filters', field], (name: string) => {
          return legendOption?.selected[name] ?? true;
        });
      }
    } else {
      // 设置全局的 legend 配置
      set(this.options, ['legends'], field);
    }

    return this;
  }

  /**
   * 批量设置 scale 配置。
   *
   * ```ts
   * view.scale({
   *   sale: {
   *     min: 0,
   *     max: 100,
   *   }
   * });
   * ```
   * Scale 的详细配置项可以参考：https://github.com/antvis/scale#api
   * @returns View
   */
  public scale(field: Record<string, ScaleOption>): View;
  /**
   * 为特性的数据字段进行 scale 配置。
   *
   * ```ts
   * view.scale('sale', {
   *   min: 0,
   *   max: 100,
   * });
   * ```
   *
   * @returns View
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
   * tooltip 提示信息配置。
   *
   * ```ts
   * view.tooltip(false); // 关闭 tooltip
   *
   * view.tooltip({
   *   shared: true
   * });
   * ```
   *
   * @param cfg Tooltip 配置，更详细的配置项参考：https://github.com/antvis/component#tooltip
   * @returns View
   */
  public tooltip(cfg: boolean | TooltipOption): View {
    set(this.options, 'tooltip', cfg);

    return this;
  }

  /**
   * 辅助标记配置。
   *
   * ```ts
   * view.annotation().line({
   *   start: ['min', 85],
   *   end: ['max', 85],
   *   style: {
   *     stroke: '#595959',
   *     lineWidth: 1,
   *     lineDash: [3, 3],
   *   },
   * });
   * ```
   * 更详细的配置项：https://github.com/antvis/component#annotation
   * @returns [[Annotation]]
   */
  public annotation(): Annotation {
    return this.getController('annotation');
  }

  /**
   * @deprecated
   * This method will be removed at G2 V4.1. Replaced by {@link #guide()}
   */
  public guide(): Annotation {
    console.warn('This method will be removed at G2 V4.1. Please use chart.annotation() instead.');
    return this.annotation();
  }

  /**
   * 坐标系配置。
   *
   * @example
   * ```ts
   * view.coordinate({
   *   type: 'polar',
   *   cfg: {
   *     radius: 0.85,
   *   },
   *   actions: [
   *     [ 'transpose' ],
   *   ],
   * });
   * ```
   *
   * @param option
   * @returns
   */
  public coordinate(option?: CoordinateOption): CoordinateController;
  /**
   * 声明坐标系类型，并进行配置。
   *
   * ```ts
   * // 直角坐标系，并进行转置变换
   * view.coordinate('rect').transpose();
   *
   * // 默认创建直角坐标系
   * view.coordinate();
   * ```
   *
   * @param type 坐标系类型
   * @param [coordinateCfg] 坐标系配置
   * @returns
   */
  public coordinate(type: string, coordinateCfg?: CoordinateCfg): CoordinateController;
  public coordinate(type: string | CoordinateOption, coordinateCfg?: CoordinateCfg): CoordinateController {
    // 提供语法糖，使用更简单
    if (isString(type)) {
      set(this.options, 'coordinate', { type, cfg: coordinateCfg } as CoordinateOption);
    } else {
      set(this.options, 'coordinate', type);
    }

    // 更新 coordinate 配置
    this.coordinateController.update(this.options.coordinate);

    return this.coordinateController;
  }

  /**
   * @deprecated
   * This method will be removed at G2 V4.1. Replaced by {@link #coordinate()}
   */
  public coord(type: string | CoordinateOption, coordinateCfg?: CoordinateCfg): CoordinateController {
    console.warn('This method will be removed at G2 V4.1. Please use chart.coordinate() instead.');
    // @ts-ignore
    return this.coordinate(type, coordinateCfg);
  }

  /**
   * view 分面绘制。
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
   * @param type 分面类型
   * @param cfg 分面配置， [[FacetCfgMap]]
   * @returns View
   */
  public facet<T extends keyof FacetCfgMap>(type: T, cfg: FacetCfgMap[T]): View {
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
   * 开启或者关闭动画。
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
   * 更新配置项，用于配置项式声明。
   * @param options 配置项
   */
  public updateOptions(options: Options) {
    this.clear(); // 清空
    mix(this.options, options);

    // 需要把已存在的 view 销毁，否则会重复创建
    // 目前针对配置项还没有特别好的 view 更新机制，为了不影响主流流程，所以在这里直接销毁
    this.views.forEach((view) => view.destroy());
    this.views = [];

    this.initOptions();
    // 初始化坐标系大小，保证 padding 计算正确
    this.coordinateBBox = this.viewBBox;
    return this;
  }

  /**
   * 往 `view.options` 属性中存储配置项。
   * @param name 属性名称
   * @param opt 属性值
   * @returns view
   */
  public option(name: string, opt: any): View {
    // 对于内置的 option，避免覆盖。
    // name 在原型上，说明可能是内置 API，存在 option 被覆盖的风险，不处理
    if (View.prototype[name]) {
      throw new Error(`Can't use built in variable name "${name}", please change another one.`);
    }

    // 存入到 option 中
    set(this.options, name, opt);
    return this;
  }

  /**
   * 设置主题。
   *
   * ```ts
   * view.theme('dark'); // 'dark' 需要事先通过 `registerTheme()` 接口注册完成
   *
   * view.theme({ defaultColor: 'red' });
   * ```
   *
   * @param theme 主题名或者主题配置
   * @returns View
   */
  public theme(theme: string | LooseObject): View {
    this.themeObject = isObject(theme) ? deepMix({}, this.themeObject, createTheme(theme)) : getTheme(theme);

    return this;
  }

  /* end 一系列传入配置的 API */

  /**
   * Call the interaction based on the interaction name
   *
   * ```ts
   * view.interaction('my-interaction', { extra: 'hello world' });
   * ```
   * 详细文档可以参考：https://g2.antv.vision/zh/docs/api/general/interaction
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
    this.isDataChanged = true;
    this.emit(VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, Event.fromData(this, VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, null));
    // 1. 保存数据
    this.data(data);

    // 2. 渲染
    this.paint(true);

    // 3. 遍历子 view 进行 change data
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      // FIXME 子 view 有自己的数据的情况，该如何处理？
      view.changeData(data);
    }

    this.emit(VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, Event.fromData(this, VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, null));
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
    // 将会在 4.1 版本中移除递归嵌套 view，仅仅只允许 chart - view 两层。
    // 这个 API 理论上用户量不多，所以暂时不发大版本，所以先暂时打一个 warning。
    if (this.parent && this.parent.parent) {
      // 存在 3 层 结构了
      console.warn('The view nesting recursive feature will be removed at G2 V4.1. Please avoid to use it.');
    }

    // 子 view 共享 options 配置数据
    const sharedOptions = {
      data: this.options.data,
      scales: clone(this.options.scales),
      axes: clone(this.options.axes),
      coordinate: clone(this.coordinateController.getOption()),
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

    this.views.push(v);

    return v;
  }

  /**
   * @deprecated
   * This method will be removed at G2 V4.1. Replaced by {@link #createView()}
   */
  public view(cfg?: Partial<ViewCfg>) {
    console.warn('This method will be removed at G2 V4.1. Please use chart.createView() instead.');
    return this.createView(cfg);
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
   * 获取当前坐标系实例。
   * @returns [[Coordinate]]
   */
  public getCoordinate() {
    return this.coordinateInstance;
  }

  /**
   * 获取当前 view 的主题配置。
   * @returns themeObject
   */
  public getTheme(): LooseObject {
    return this.themeObject;
  }

  /**
   * 获得 x 轴字段的 scale 实例。
   * @returns view 中 Geometry 对于的 x scale
   */
  public getXScale(): Scale {
    // 拿第一个 Geometry 的 X scale
    // 隐藏逻辑：一个 view 中的 Geometry 必须 x 字段一致
    const g = this.geometries[0];
    return g ? g.getXScale() : null;
  }

  /**
   * 获取 y 轴字段的 scales 实例。
   * @returns view 中 Geometry 对于的 y scale 数组
   */
  public getYScales(): Scale[] {
    // 拿到所有的 Geometry 的 Y scale，然后去重
    const tmpMap = {};
    const yScales = [];
    this.geometries.forEach((g: Geometry) => {
      const yScale = g.getYScale();
      const field = yScale.field;
      if (!tmpMap[field]) {
        tmpMap[field] = true;
        yScales.push(yScale);
      }
    });
    return yScales;
  }

  /**
   * 获取 x 轴或者 y 轴对应的所有 scale 实例。
   * @param dimType x | y
   * @returns x 轴或者 y 轴对应的所有 scale 实例。
   */
  public getScalesByDim(dimType: 'x' | 'y'): Record<string, Scale> {
    const geometries = this.geometries;
    const scales = {};

    for (let i = 0, len = geometries.length; i < len; i++) {
      const geometry = geometries[i];
      const scale = dimType === 'x' ? geometry.getXScale() : geometry.getYScale();
      if (scale && !scales[scale.field]) {
        scales[scale.field] = scale;
      }
    }

    return scales;
  }

  /**
   * 根据字段名去获取 scale 实例。
   * @param field 数据字段名称
   * @param key id
   */
  public getScale(field: string, key?: string): Scale {
    const defaultKey = key ? key : this.getScaleKey(field);
    // 调用根节点 view 的方法获取
    return this.getRootView().scalePool.getScale(defaultKey);
  }

  /**
   * @deprecated
   * This method will be removed at G2 V4.1. Please use `getScale`.
   */
  public getScaleByField(field: string, key?: string): Scale {
    return this.getScale(field, key);
  }

  /**
   * 返回所有配置信息。
   * @returns 所有的 view API 配置。
   */
  public getOptions(): Options {
    return this.options;
  }

  /**
   * 获取 view 的数据（过滤后的数据）。
   * @returns 处理过滤器之后的数据。
   */
  public getData() {
    return this.filteredData;
  }

  /**
   * 获取原始数据
   * @returns 传入 G2 的原始数据
   */
  public getOriginalData() {
    return this.options.data;
  }

  /**
   * 获取布局后的边距 padding
   * @returns
   */
  public getPadding(): Padding {
    return this.autoPadding.getPadding();
  }

  /**
   * 获取当前 view 有的 geometries
   * @returns
   */
  public getGeometries() {
    return this.geometries;
  }

  /**
   * 获取 view 中的所有 geome
   */
  public getElements(): Element[] {
    return reduce(
      this.geometries,
      (elements: Element[], geometry: Geometry) => {
        return elements.concat(geometry.getElements());
      },
      []
    );
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
    return this.getElements().filter((el) => condition(el));
  }

  /**
   * 获得绘制的层级 group。
   * @param layer 层级名称。
   * @returns 对应层级的 Group。
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
   * 对外暴露方法，判断一个点是否在绘图区域（即坐标系范围）内部。
   * @param point 坐标点
   */
  public isPointInPlot(point: Point): boolean {
    return isPointInCoordinate(this.getCoordinate(), point);
  }

  /**
   * 获得所有的 legend 对应的 attribute 实例。
   * @returns 维度字段的 Attribute 数组
   */
  public getLegendAttributes(): Attribute[] {
    return flatten(this.geometries.map((g: Geometry) => g.getGroupAttributes())) as unknown as Attribute[];
  }

  /**
   * 获取所有的分组字段的 scale 实例。
   * @returns 获得分组字段的 scale 实例数组。
   */
  public getGroupScales(): Scale[] {
    // 拿到所有的 Geometry 的 分组字段 scale，然后打平去重
    const scales = this.geometries.map((g: Geometry) => g.getGroupScales());
    return uniq(flatten(scales));
  }

  /**
   * 获取 G.Canvas 实例。
   * @returns G.Canvas 画布实例。
   */
  public getCanvas(): ICanvas {
    return (this.getRootView() as unknown as Chart).canvas;
  }

  /**
   * 获得根节点 view。
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
   * 获取该数据在可视化后，对应的画布坐标点。
   * @param data 原始数据记录
   * @returns 对应的画布坐标点
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

  public getController(name: 'tooltip'): Tooltip;
  public getController(name: 'axis'): Axis;
  public getController(name: 'legend'): Legend;
  public getController(name: 'scrollbar'): Scrollbar;
  public getController(name: 'slider'): Slider;
  public getController(name: 'annotation'): Annotation;
  public getController(name: 'gestucre'): Gesture;
  public getController(name: string): Controller;
  /**
   * 获取 name 对应的 controller 实例
   * @param name
   */
  public getController(name: string): Controller {
    return find(this.controllers, (c: Controller) => c.name === name);
  }

  /**
   * 显示 point 坐标点对应的 tooltip。
   * @param point 画布坐标点
   * @returns View
   */
  public showTooltip(point: Point): View {
    const tooltip = this.getController('tooltip');
    if (tooltip) {
      tooltip.showTooltip(point);
    }
    return this;
  }

  /**
   * 隐藏 tooltip。
   * @returns View
   */
  public hideTooltip(): View {
    const tooltip = this.getController('tooltip');
    if (tooltip) {
      tooltip.hideTooltip();
    }
    return this;
  }

  /**
   * 将 tooltip 锁定到当前位置不能移动。
   * @returns View
   */
  public lockTooltip(): View {
    const tooltip = this.getController('tooltip');
    if (tooltip) {
      tooltip.lockTooltip();
    }
    return this;
  }

  /**
   * 将 tooltip 锁定解除。
   * @returns View
   */
  public unlockTooltip(): View {
    const tooltip = this.getController('tooltip');
    if (tooltip) {
      tooltip.unlockTooltip();
    }
    return this;
  }

  /**
   * 是否锁定 tooltip。
   * @returns 是否锁定
   */
  public isTooltipLocked() {
    const tooltip = this.getController('tooltip');
    return tooltip && tooltip.isTooltipLocked();
  }

  /**
   * 获取当前 point 对应的 tooltip 数据项。
   * @param point 坐标点
   * @returns tooltip 数据项
   */
  public getTooltipItems(point: Point) {
    const tooltip = this.getController('tooltip');

    return tooltip ? tooltip.getTooltipItems(point) : [];
  }

  /**
   * 获取逼近的点的数据集合
   * @param point 当前坐标点
   * @returns  数据
   */
  public getSnapRecords(point: Point) {
    const geometries = this.geometries;
    let rst = [];
    for (let i = 0, len = geometries.length; i < len; i++) {
      const geom = geometries[i];
      const dataArray = geom.dataArray;
      geom.sort(dataArray); // 先进行排序，便于 tooltip 查找
      let record;
      for (let j = 0, dataLen = dataArray.length; j < dataLen; j++) {
        const data = dataArray[j];
        record = findDataByPoint(point, data, geom);
        if (record) {
          rst.push(record);
        }
      }
    }

    // 同样递归处理子 views
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      const snapRecords = view.getSnapRecords(point);
      rst = rst.concat(snapRecords);
    }

    return rst;
  }

  /**
   * 获取所有的 pure component 组件，用于布局。
   */
  public getComponents(): ComponentOption[] {
    let components = [];
    const controllers = this.controllers;
    for (let i = 0, len = controllers.length; i < len; i++) {
      const controller = controllers[i];
      components = components.concat(controller.getComponents());
    }

    return components;
  }

  /**
   * 将 data 数据进行过滤。
   * @param data
   * @returns 过滤之后的数据
   */
  public filterData(data: Data): Data {
    const { filters } = this.options;
    // 不存在 filters，则不需要进行数据过滤
    if (size(filters) === 0) {
      return data;
    }

    // 存在过滤器，则逐个执行过滤，过滤器之间是 与 的关系
    return filter(data, (datum: Datum, idx: number) => {
      // 所有的 filter 字段
      const fields = Object.keys(filters);

      // 所有的条件都通过，才算通过
      return fields.every((field: string) => {
        const condition = filters[field];

        // condition 返回 true，则保留
        return condition(datum[field], datum, idx);
      });
    });
  }

  /**
   * 对某一个字段进行过滤
   * @param field
   * @param data
   */
  public filterFieldData(field: string, data: Data): Data {
    const { filters } = this.options;
    const condition = get(filters, field);

    if (isUndefined(condition)) {
      return data;
    }
    return data.filter((datum: Datum, idx: number) => condition(datum[field], datum, idx));
  }

  /**
   * 调整 coordinate 的坐标范围。
   */
  public adjustCoordinate() {
    const { start: curStart, end: curEnd } = this.getCoordinate();
    const start = this.coordinateBBox.bl;
    const end = this.coordinateBBox.tr;

    // 在 defaultLayoutFn 中只会在 coordinateBBox 发生变化的时候会调用 adjustCoordinate()，所以不用担心被置位
    if (isEqual(curStart, start) && isEqual(curEnd, end)) {
      this.isCoordinateChanged = false;
      // 如果大小没有变化则不更新
      return;
    }
    this.isCoordinateChanged = true;
    this.coordinateInstance = this.coordinateController.adjust(start, end);
  }

  protected paint(isUpdate: boolean) {
    this.renderDataRecursive(isUpdate);

    // 处理 sync scale 的逻辑
    this.syncScale();

    this.emit(VIEW_LIFE_CIRCLE.BEFORE_PAINT);

    // 初始化图形、组件位置，计算 padding
    this.renderPaddingRecursive(isUpdate);
    // 布局图形、组件
    this.renderLayoutRecursive(isUpdate);
    // 背景色 shape
    this.renderBackgroundStyleShape();
    // 最终的绘制 render
    this.renderPaintRecursive(isUpdate);

    this.emit(VIEW_LIFE_CIRCLE.AFTER_PAINT);

    this.isDataChanged = false; // 渲染完毕复位
  }

  /**
   * 渲染背景样式的 shape。
   * 放到 view 中创建的原因是让使用 view 绘制图形的时候，也能够处理背景色
   */
  private renderBackgroundStyleShape() {
    // 只有根节点才处理
    if (this.parent) {
      return;
    }
    const background = get(this.themeObject, 'background');
    // 配置了背景色
    if (background) {
      // 1. 不存在则创建
      if (!this.backgroundStyleRectShape) {
        this.backgroundStyleRectShape = this.backgroundGroup.addShape('rect', {
          attrs: {},
          zIndex: -1,
          // 背景色 shape 不设置事件捕获
          capture: false,
        });
        this.backgroundStyleRectShape.toBack();
      }

      // 2. 有了 shape 之后设置背景，位置（更新的时候）
      const { x, y, width, height } = this.viewBBox;
      this.backgroundStyleRectShape.attr({
        fill: background,
        x,
        y,
        width,
        height,
      });
    } else {
      // 没有配置背景色
      if (this.backgroundStyleRectShape) {
        this.backgroundStyleRectShape.remove(true);
        this.backgroundStyleRectShape = undefined;
      }
    }
  }

  /**
   * 递归计算每个 view 的 padding 值，coordinateBBox 和 coordinateInstance
   * @param isUpdate
   */
  protected renderPaddingRecursive(isUpdate: boolean) {
    // 1. 子 view 大小相对 coordinateBBox，changeSize 的时候需要重新计算
    this.calculateViewBBox();
    // 2. 更新 coordinate
    this.adjustCoordinate();
    // 3. 初始化组件 component
    this.initComponents(isUpdate);
    // 4. 布局计算每隔 view 的 padding 值
    // 4.1. 自动加 auto padding -> absolute padding，并且增加 appendPadding
    this.autoPadding = calculatePadding(this).shrink(parsePadding(this.appendPadding));
    // 4.2. 计算出新的 coordinateBBox，更新 Coordinate
    // 这里必须保留，原因是后面子 view 的 viewBBox 或根据 parent 的 coordinateBBox
    this.coordinateBBox = this.viewBBox.shrink(this.autoPadding.getPadding());
    this.adjustCoordinate();

    // 同样递归处理子 views
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      view.renderPaddingRecursive(isUpdate);
    }
  }

  /**
   * 递归处理 view 的布局，最终是计算各个 view 的 coordinateBBox 和 coordinateInstance
   * @param isUpdate
   */
  protected renderLayoutRecursive(isUpdate: boolean) {
    // 1. 同步子 view padding
    // 根据配置获取 padding
    const syncViewPaddingFn =
      this.syncViewPadding === true
        ? defaultSyncViewPadding
        : isFunction(this.syncViewPadding)
        ? this.syncViewPadding
        : undefined;

    if (syncViewPaddingFn) {
      syncViewPaddingFn(this, this.views, PaddingCal);
      // 同步 padding 之后，更新 coordinate
      this.views.forEach((v: View) => {
        v.coordinateBBox = v.viewBBox.shrink(v.autoPadding.getPadding());
        v.adjustCoordinate();
      });
    }

    // 3. 将 view 中的组件按照 view padding 移动到对应的位置
    this.doLayout();

    // 同样递归处理子 views
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      view.renderLayoutRecursive(isUpdate);
    }
  }

  /**
   * 最终递归绘制组件和图形
   * @param isUpdate
   */
  protected renderPaintRecursive(isUpdate: boolean) {
    const middleGroup = this.middleGroup;
    if (this.limitInPlot) {
      const { type, attrs } = getCoordinateClipCfg(this.coordinateInstance);
      middleGroup.setClip({
        type,
        attrs,
      });
    } else {
      // 清除已有的 clip
      middleGroup.setClip(undefined);
    }

    // 1. 渲染几何标记
    this.paintGeometries(isUpdate);
    // 2. 绘制组件
    this.renderComponents(isUpdate);

    // 同样递归处理子 views
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      view.renderPaintRecursive(isUpdate);
    }
  }

  // end Get 方法

  /**
   * 创建 scale，递归到顶层 view 去创建和缓存 scale
   * @param field
   * @param data
   * @param scaleDef
   * @param key
   */
  protected createScale(field: string, data: Data, scaleDef: ScaleOption, key: string): Scale {
    // 1. 合并 field 对应的 scaleDef，合并原则是底层覆盖顶层（就近原则）
    const currentScaleDef = get(this.options.scales, [field]);
    const mergedScaleDef = { ...currentScaleDef, ...scaleDef };

    // 2. 是否存在父 view，在则递归，否则创建
    if (this.parent) {
      return this.parent.createScale(field, data, mergedScaleDef, key);
    }

    // 3. 在根节点 view 通过 scalePool 创建
    return this.scalePool.createScale(field, data, mergedScaleDef, key);
  }

  /**
   * 递归渲染中的数据处理
   * @param isUpdate
   */
  private renderDataRecursive(isUpdate: boolean) {
    // 1. 处理数据
    this.doFilterData();
    // 2. 创建实例
    this.createCoordinate();
    // 3. 初始化 Geometry
    this.initGeometries(isUpdate);
    // 4. 处理分面逻辑，最终都是生成子 view 和 geometry
    this.renderFacet(isUpdate);

    // 同样递归处理子 views
    const views = this.views;
    for (let i = 0, len = views.length; i < len; i++) {
      const view = views[i];
      view.renderDataRecursive(isUpdate);
    }
  }

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
    const viewBBox = new BBox(
      x + width * start.x,
      y + height * start.y,
      width * (end.x - start.x),
      height * (end.y - start.y)
    );

    if (!this.viewBBox || !this.viewBBox.isEqual(viewBBox)) {
      // viewBBox 发生变化的时候进行更新
      this.viewBBox = new BBox(
        x + width * start.x,
        y + height * start.y,
        width * (end.x - start.x),
        height * (end.y - start.y)
      );
    }

    // 初始的 coordinate bbox 大小
    this.coordinateBBox = this.viewBBox;
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
    this.foregroundGroup.on('*', this.onDelegateEvents);
    this.middleGroup.on('*', this.onDelegateEvents);
    this.backgroundGroup.on('*', this.onDelegateEvents);

    this.canvas.on('*', this.onCanvasEvent);
  }

  private onCanvasEvent = (evt: GEvent): void => {
    const name = evt.name;
    if (!name.includes(':')) {
      // 非委托事件
      const e = this.createViewEvent(evt);
      // 处理 plot 事件
      this.doPlotEvent(e);
      this.emit(name, e);
    }
  };

  /**
   * 初始化插件
   */
  private initComponentController() {
    const usedControllers = this.usedControllers;
    for (let i = 0, len = usedControllers.length; i < len; i++) {
      const controllerName = usedControllers[i];
      const Ctor = getComponentController(controllerName);
      if (Ctor) {
        this.controllers.push(new Ctor(this));
      }
    }
  }

  private createViewEvent(evt: GEvent) {
    const { shape, name } = evt;

    const data = shape ? shape.get('origin') : null;
    // 事件在 view 嵌套中冒泡（暂不提供阻止冒泡的机制）
    const e = new Event(this, evt, data);
    e.type = name;
    return e;
  }
  /**
   * 触发事件之后
   * @param evt
   */
  private onDelegateEvents = (evt: GEvent): void => {
    // 阻止继续冒泡，防止重复事件触发
    // evt.preventDefault();
    const { name } = evt;
    if (!name.includes(':')) {
      return;
    }
    // 事件在 view 嵌套中冒泡（暂不提供阻止冒泡的机制）
    const e = this.createViewEvent(evt);

    // 包含有基本事件、组合事件
    this.emit(name, e);
    // const currentTarget = evt.currentTarget as IShape;
    // const inheritNames = currentTarget.get('inheritNames');
    // if (evt.delegateObject || inheritNames) {
    //   const events = this.getEvents();
    //   each(inheritNames, (subName) => {
    //     const eventName = `${subName}:${type}`;
    //     if (events[eventName]) {
    //       this.emit(eventName, e);
    //     }
    //   });
    // }
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
      'mouseleave',
      'mousewheel',
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
      const newEvent = e.clone();

      if (currentInPlot) {
        const TYPE = `plot:${type}`; // 组合 plot 事件
        newEvent.type = TYPE;
        this.emit(TYPE, newEvent);
        if (type === 'mouseleave' || type === 'touchend') {
          // 在plot 内部却离开画布
          this.isPreMouseInPlot = false;
        }
      }

      // 对于 mouseenter, mouseleave 的计算处理
      if (type === 'mousemove' || type === 'touchmove') {
        if (this.isPreMouseInPlot && !currentInPlot) {
          if (type === 'mousemove') {
            newEvent.type = PLOT_EVENTS.MOUSE_LEAVE;
            this.emit(PLOT_EVENTS.MOUSE_LEAVE, newEvent);
          }
          newEvent.type = PLOT_EVENTS.LEAVE;
          this.emit(PLOT_EVENTS.LEAVE, newEvent);
        } else if (!this.isPreMouseInPlot && currentInPlot) {
          if (type === 'mousemove') {
            newEvent.type = PLOT_EVENTS.MOUSE_ENTER;
            this.emit(PLOT_EVENTS.MOUSE_ENTER, newEvent);
          }
          newEvent.type = PLOT_EVENTS.ENTER;
          this.emit(PLOT_EVENTS.ENTER, newEvent);
        }
        // 赋新的状态值
        this.isPreMouseInPlot = currentInPlot;
      } else if (type === 'mouseleave' || type === 'touchend') {
        // 可能不在 currentInPlot 中
        if (this.isPreMouseInPlot) {
          if (type === 'mouseleave') {
            newEvent.type = PLOT_EVENTS.MOUSE_LEAVE;
            this.emit(PLOT_EVENTS.MOUSE_LEAVE, newEvent);
          }
          newEvent.type = PLOT_EVENTS.LEAVE;
          this.emit(PLOT_EVENTS.LEAVE, newEvent);

          this.isPreMouseInPlot = false;
        }
      }
    }
  }

  // view 生命周期 —— 渲染流程

  /**
   * 处理筛选器，筛选数据
   * @private
   */
  private doFilterData() {
    const { data } = this.options;
    this.filteredData = this.filterData(data);
  }

  /**
   * 初始化 Geometries
   * @private
   */
  private initGeometries(isUpdate: boolean) {
    // 初始化图形的之前，先创建 / 更新 scales
    this.createOrUpdateScales();
    // 实例化 Geometry，然后 view 将所有的 scale 管理起来
    const coordinate = this.getCoordinate();
    const scaleDefs = get(this.options, 'scales', {});
    const geometries = this.geometries;
    for (let i = 0, len = geometries.length; i < len; i++) {
      const geometry = geometries[i];
      // 保持 scales 引用不要变化
      geometry.scales = this.getGeometryScales();
      const cfg = {
        coordinate, // 使用 coordinate 引用，可以保持 coordinate 的同步更新
        scaleDefs,
        data: this.filteredData,
        theme: this.themeObject,
        isDataChanged: this.isDataChanged,
        isCoordinateChanged: this.isCoordinateChanged,
      };

      if (isUpdate) {
        // 数据发生更新
        geometry.update(cfg);
      } else {
        geometry.init(cfg);
      }
    }

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

    const { data, scales = {} } = this.getOptions();
    const filteredData = this.filteredData;

    for (let i = 0, len = fields.length; i < len; i++) {
      const field = fields[i];
      const scaleDef = scales[field];

      // 调用方法，递归去创建
      const key = this.getScaleKey(field);
      this.createScale(
        field,
        // 分组字段的 scale 使用未过滤的数据创建
        groupedFields.includes(field) ? data : filteredData,
        scaleDef,
        key
      );

      // 缓存从当前 view 创建的 scale key
      this.createdScaleKeys.set(key, true);
    }
  }

  /**
   * 处理 scale 同步逻辑
   */
  private syncScale() {
    // 最终调用 root view 的
    this.getRootView().scalePool.sync(this.getCoordinate(), this.theme);
  }

  /**
   * 获得 Geometry 中的 scale 对象
   */
  private getGeometryScales(): Record<string, Scale> {
    const fields = this.getScaleFields();

    const scales = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      scales[field] = this.getScaleByField(field);
    }

    return scales;
  }

  private getScaleFields() {
    const fields = [];
    const tmpMap = new Map();
    const geometries = this.geometries;
    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      const geometryScales = geometry.getScaleFields();
      uniq(geometryScales, fields, tmpMap);
    }
    return fields;
  }

  private getGroupedFields() {
    const fields = [];
    const tmpMap = new Map();
    const geometries = this.geometries;
    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      const groupFields = geometry.getGroupFields();
      uniq(groupFields, fields, tmpMap);
    }
    return fields;
  }

  /**
   * 调整 scale 配置
   * @private
   */
  private adjustScales() {
    // 调整目前包括：
    // 分类 scale，调整 range 范围
    this.adjustCategoryScaleRange();
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
      const { field, values, isCategory, isIdentity } = scale;

      // 分类或者 identity 的 scale 才进行处理
      if (isCategory || isIdentity) {
        // 存在 value 值，且用户没有配置 range 配置
        if (values && !get(scaleOptions, [field, 'range'])) {
          // 更新 range
          scale.range = getDefaultCategoryScaleRange(scale, coordinate, this.theme);
        }
      }
    });
  }

  /**
   * 根据 options 配置、Geometry 字段配置，自动生成 components
   * @param isUpdate 是否是更新
   * @private
   */
  private initComponents(isUpdate: boolean) {
    // 先全部清空，然后 render
    const controllers = this.controllers;
    for (let i = 0; i < controllers.length; i++) {
      const controller = controllers[i];
      // 更新则走更新逻辑；否则清空载重绘
      if (isUpdate) {
        controller.update();
      } else {
        controller.clear();
        controller.render();
      }
    }
  }

  private doLayout() {
    this.layoutFunc(this);
  }

  /**
   * 创建坐标系
   * @private
   */
  private createCoordinate() {
    const start = this.coordinateBBox.bl;
    const end = this.coordinateBBox.tr;
    this.coordinateInstance = this.coordinateController.create(start, end);
  }

  /**
   * 根据 options 配置自动渲染 geometry
   * @private
   */
  private paintGeometries(isUpdate: boolean) {
    const doAnimation = this.options.animate;
    // geometry 的 paint 阶段
    const coordinate = this.getCoordinate();
    const canvasRegion = {
      x: this.viewBBox.x,
      y: this.viewBBox.y,
      minX: this.viewBBox.minX,
      minY: this.viewBBox.minY,
      maxX: this.viewBBox.maxX,
      maxY: this.viewBBox.maxY,
      width: this.viewBBox.width,
      height: this.viewBBox.height,
    };
    const geometries = this.geometries;
    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      geometry.coordinate = coordinate;
      geometry.canvasRegion = canvasRegion;
      if (!doAnimation) {
        // 如果 view 不执行动画，那么 view 下所有的 geometry 都不执行动画
        geometry.animate(false);
      }
      geometry.paint(isUpdate);
    }
  }

  /**
   * 最后的绘制组件
   * @param isUpdate
   */
  private renderComponents(isUpdate: boolean) {
    // 先全部清空，然后 render
    for (let i = 0; i < this.getComponents().length; i++) {
      const co = this.getComponents()[i];
      (co.component as GroupComponent).render();
    }
  }

  /**
   * 渲染分面，会在其中进行数据分面，然后进行子 view 创建
   * @param isUpdate
   */
  private renderFacet(isUpdate: boolean) {
    if (this.facetInstance) {
      if (isUpdate) {
        this.facetInstance.update();
      } else {
        this.facetInstance.clear();
        // 计算分面数据
        this.facetInstance.init();
        // 渲染组件和 views
        this.facetInstance.render();
      }
    }
  }

  private initOptions() {
    const {
      geometries = [],
      interactions = [],
      views = [],
      annotations = [],
      coordinate,
      events,
      facets,
    } = this.options;

    // 设置坐标系
    if (this.coordinateController) {
      // 更新 coordinate controller
      coordinate && this.coordinateController.update(coordinate);
    } else {
      // 创建 coordinate controller
      this.coordinateController = new CoordinateController(coordinate);
    }

    // 创建 geometry 实例
    for (let i = 0; i < geometries.length; i++) {
      const geometryOption = geometries[i];
      this.createGeometry(geometryOption);
    }

    // 创建 interactions 实例
    for (let j = 0; j < interactions.length; j++) {
      const interactionOption = interactions[j];
      const { type, cfg } = interactionOption;
      this.interaction(type, cfg);
    }

    // 创建 view 实例
    for (let k = 0; k < views.length; k++) {
      const viewOption = views[k];
      this.createView(viewOption);
    }

    // 设置 annotation
    const annotationComponent = this.getController('annotation');
    for (let l = 0; l < annotations.length; l++) {
      const annotationOption = annotations[l];
      annotationComponent.annotation(annotationOption);
    }

    // 设置 events
    if (events) {
      each(events, (eventCallback, eventName) => {
        this.on(eventName, eventCallback);
      });
    }

    if (facets) {
      each(facets, (facet) => {
        const { type, ...rest } = facet;

        this.facet(type, rest);
      });
    }
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
  View.prototype[name.toLowerCase()] = function (cfg: any = {}) {
    const props = {
      /** 图形容器 */
      container: this.middleGroup.addGroup(),
      labelsContainer: this.foregroundGroup.addGroup(),
      ...cfg,
    };

    const geometry = new Ctor(props);
    this.geometries.push(geometry);

    return geometry;
  };
}

export default View;
