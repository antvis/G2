import EE from '@antv/event-emitter';
import { deepMix, each, isBoolean, isObject, isString, set, uniqueId } from '@antv/util';
import { getTheme } from '../theme';
import { Facet } from '../facet';
import { BBox } from '../util/bbox';
import { getFacet } from '../util/facet';
import { createInteraction } from '../util/interaction';
import { Geometry } from '../geometry';
import type {
  Data,
  PlainObject,
  Region,
  Options,
  AxisOption,
  LegendOption,
  TooltipOption,
  CoordinateOption,
  ScaleDefOptions,
  ViewCfg,
  AutoPadding,
  Padding,
} from '../types';
import type { StyleSheet } from '../types/theme';
import { ScalePool } from '../visual/scale/pool';

/**
 * 图表容器，可以嵌套迭代。容器中主要包含有三类组件：
 * 1. 组件
 * 2. 图形
 * 3. 子容器
 */
export class View extends EE {
  /**
   * 全局唯一的 id 标识
   */
  public id: string;

  /**
   * 父节点
   */
  public parent: View;

  /**
   * auto padding 配置
   */
  public padding: AutoPadding;

  /**
   * 在 auto padding 的基础上，额外追加的边距 padding
   */
  public appendPadding: Padding;

  /**
   * 所有的子 views
   */
  public views: View[];

  /**
   * 当前 view 包含的图形 Geometry 数组
   */
  public geometries: Geometry[];

  /**
   * 当前 view 包含的组件 Component 数组
   */
  public components: any[];

  /**
   * 所有组件对应的 controller 实例
   */
  public controllers: any[];

  /**
   * 加载的交互实例
   */
  public interactions: Record<string, any> = {};

  /** 分面类实例 */
  public facetInstance: Facet;

  /**
   * view 视图的矩形位置范围
   */
  public viewBBox: BBox;

  /**
   * view.coordinate 对饮的矩形位置范围
   */
  public coordinateBBox: BBox;

  /**
   * G.Canvas 画布对象
   */
  public canvas: any;

  /** 三层 Group 图形中的背景层 */
  public backgroundGroup: any;

  /** 三层 Group 图形中的中间层 */
  public middleGroup: any;

  /** 三层 Group 图形中的前景层 */
  public foregroundGroup: any;

  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  public limitInPlot: boolean = false;

  /**
   * 标记 view 的大小位置范围，均是 0 ~ 1 范围，便于开发者使用，起始点为左上角。
   */
  protected region: Region;

  /** 主题配置，存储当前主题配置。 */
  protected themeObject: StyleSheet;

  // 配置信息存储
  protected options: Options = {
    data: [],
    animate: true, // 默认开启动画
  }; // 初始化为空

  /** 过滤之后的数据 */
  protected filteredData: Data;

  /** 所有的 scales */
  private scalePool = new ScalePool();

  /** 生成的坐标系实例，{@link https://github.com/antvis/coord/blob/master/src/coord/base.ts|Coordinate} */
  protected coordinateInstance: any;

  /** 背景色样式的 shape */
  private backgroundStyleRectShape;

  /** 是否同步子 view 的 padding */
  private syncViewPadding;

  constructor(cfg: ViewCfg) {
    super();

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
      options,
      theme = 'light',
      limitInPlot,
      syncViewPadding,
    } = cfg;

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
    this.themeObject = isObject(theme) ? deepMix({}, getTheme('light'), theme) : getTheme(theme);
  }

  /** 初始化 View 配置 API    **************************************************** */

  /**
   * 设置数据
   * @param data 明细数据数组
   */
  public data(data: Data) {
    set(this.options, 'originalData', data);

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
  public scale(field: Record<string, ScaleDefOptions>): View;

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
  public scale(field: string, scaleDefOptions: ScaleDefOptions): View;
  public scale(
    field: string | Record<string, ScaleDefOptions>,
    scaleDefOptions?: ScaleDefOptions,
  ): View {
    if (isString(field)) {
      set(this.options, ['scales', field], scaleDefOptions);
    } else if (isObject(field)) {
      each(field, (v: ScaleDefOptions, k: string) => {
        set(this.options, ['scales', k], v);
      });
    }

    return this;
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
  public coordinate(option?: CoordinateOption): any {
    // todo 提供语法糖，使用更简单
    set(this.options, 'coordinate', option);

    return this.coordinateInstance;
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
   * @param cfg 分面配置
   * @returns View
   */
  public facet(type: string, cfg: any): View {
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
  public interaction(name: string, cfg?: PlainObject): View {
    const existInteraction = this.interactions[name];
    // 存在则先销毁已有的
    if (existInteraction) {
      existInteraction.destroy();
    }

    // 新建交互实例
    const interaction = createInteraction();
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
  public axis(field: string | boolean, axisOption?: AxisOption) {
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
    // todo legend 设置当前选中的状态（selected）需要反馈到数据过滤上
    if (isString(field)) {
      set(this.options, ['legends', field], legendOption);
    } else {
      set(this.options, ['legends'], field); // 设置全局的 legend 配置
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
  public annotation(): any {
    // todo return annotation controller，和其他 api 不一样的地方！
  }

  /**
   * 设置组件 slider 配置
   */
  public slider() {}

  /**
   * 设置组件 scrollbar 配置
   */
  public scrollbar() {}

  /**
   * 设置组件 timeline 配置
   */
  public timeline() {}

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
  public theme(theme: string | Partial<StyleSheet>): View {
    // 从字符串获取主题的 object 配置
    this.themeObject = deepMix({}, this.themeObject, isObject(theme) ? theme : getTheme(theme));

    return this;
  }

  /** 创建 Geometry 的 API       ********************************************** */

  /**
   * 同一使用 geometry 去初始化图形
   */
  public geom() {}

  public line() {}

  public point() {}

  public interval() {}

  public area() {}

  public polygon() {}

  public edge() {}

  /** 生命周期的 API 函数     ************************************** */

  /**
   * 初始化
   */
  public init() {}

  /**
   * 渲染（异步）
   */
  public async render() {
    // do render
  }

  /**
   * 销毁
   */
  public destroy() {}

  /** Get 数据的一些 API，做自定义的数据来源   ******************************************* */

  /**
   * 获得所有的 scale 数组信息
   */
  public getScales() {}

  /**
   * 获得某一个字段的 scale
   * @param field 字段 id
   */
  public getScale(field: string) {}

  /**
   * 获取实际展示在画布中的数据（经过过滤后的）
   */
  public getData() {
    return this.options.data;
  }

  /**
   * 获取原始传入的数据
   */
  public getOriginalData() {
    return this.options.originalData;
  }

  /**
   * 返回所有的配置项信息
   */
  public getOptions() {
    return this.options;
  }

  /**
   * 获取当前 view 的主题配置。
   * @returns themeObject
   */
  public getTheme(): StyleSheet {
    return this.themeObject;
  }

  /** 数据操作的一些 API  **************************************** */

  /**
   * 进行数据的过滤（数据分析：筛选、过滤）
   */
  public filter() {}

  /**
   * 更新数据（数据分析：下钻）
   */
  public changeData() {}

  /**
   *  设置数据的状态（数据分析：联动）
   */
  public state() {}
}
