import EE from '@antv/event-emitter';
import { deepMix, each, isBoolean, isObject, isString, isFunction, filter, set, size, uniqueId } from '@antv/util';
import { getTheme } from '../theme';
import { Facet } from '../facet';
import { BBox } from '../util/bbox';
import { getFacet } from '../util/facet';
import { createInteraction } from '../util/interaction';
import type { Element, Geometry } from '../geometry';
import {
  PlainObject,
  Region,
  ViewOptions,
  AxisOption,
  LegendOption,
  TooltipOption,
  CoordinateOption,
  ScaleDefOptions,
  AutoPadding,
  Padding,
  Data,
  FilterCondition,
  Datum,
} from '../types';
import { ScalePool } from '../visual/scale/pool';

/**
 * 图表容器，可以嵌套迭代。容器中主要包含有三类组件：
 * 1. 组件
 * 2. 图形
 * 3. 子容器
 */
export class View extends EE {
  /**
   * 唯一 id
   */
  public id: string;

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

  /** 主题配置，存储当前主题配置。 */
  protected themeObject: PlainObject;

  /** 实际渲染绘制的数据，经过过滤操作的 */
  private filteredData: Data;

  // 存储所有从构造方法传入的方法
  protected options: ViewOptions;

  /** 所有的 scales */
  private scalePool = new ScalePool();

  /** 生成的坐标系实例，{@link https://github.com/antvis/coord/blob/master/src/coord/base.ts|Coordinate} */
  protected coordinateInstance: any;

  /** 背景色样式的 shape */
  private backgroundStyleRectShape;

  constructor(options: ViewOptions) {
    super();

    // 接受父 view 传入的参数
    this.options = {
      // 一些默认值
      id: uniqueId('view'),
      region: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
      originalData: [],
      animate: true,
      theme: 'light',
      ...options,
    };

    const { id, theme } = this.options;

    // id 比较特殊，放到顶层
    this.id = id;

    // 初始化 theme
    this.themeObject = isObject(theme) ? deepMix({}, getTheme('light'), theme) : getTheme(theme);

    this.init();
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
  public theme(theme: string | PlainObject): View {
    // 从字符串获取主题的 object 配置
    this.themeObject = deepMix({}, this.themeObject, isObject(theme) ? theme : getTheme(theme));

    return this;
  }

  /** 创建 Geometry 的 API       ********************************************** */

  /**
   * 同一使用 geometry 去初始化图形
   */
  public line() {}

  public point() {}

  public interval() {}

  public area() {}

  public polygon() {}

  public edge() {}

  public schema() {}

  public venn() {}

  /** 生命周期的 API 函数     ************************************** */

  /**
   * 初始化过程，主要几个事情：
   * 1. View 的布局（根据 region 来计算，形成每个 view 的 viewBBox）
   * 2. View 事件（因为不是继承 G，所以整个事件需要代理一下）
   * 3. 各种 controller 实例化
   */
  public init() {
    this.calculateViewBBox();

    /** 绑定/代理 G 事件 */
    this.bindEvents();

    /** TODO: 是否有更好的方式 */
    this.initControllers();
  }

  /**
   * 根据 region，计算实际的像素范围坐标，放到 this.viewBBox 上。
   * 1. 当前 view 的大小等于父 view 的 coordinateBBox 大小
   * 2. 根据当前容器的大小，结合 region 配置，得到实际的大小
   */
  private calculateViewBBox() {
    const { parent, canvas, region } = this.options;

    let bbox;
    if (parent) {
      // 存在 parent， 那么就是通过父容器大小计算
      bbox = parent.coordinateBBox;
    } else {
      // 顶层容器，从 canvas 中取值 宽高，整个画布的大小
      // bbox = new BBox(0, 0, canvas.get('width'), canvas.get('height'));
      // @ts-ignore
      bbox = new BBox(0, 0, canvas.width, canvas.height);
    }

    // 根据 region 计算当前 view 的 bbox 大小。
    const { x, y, width, height } = bbox;
    const { start, end } = region;

    const newViewBBox = new BBox(
      x + width * start.x,
      y + height * start.y,
      width * (end.x - start.x),
      height * (end.y - start.y),
    );

    // viewBBox 发生变化的时候进行更新
    if (!this.viewBBox?.isEqual(newViewBBox)) {
      this.viewBBox = newViewBBox;
    }

    // 因为子 view 会依赖父 view 的 coordinateBBox，所以需要初始化一下当前的 coordinateBBox
    this.coordinateBBox = this.viewBBox;
  }

  /**
   * 绑定事件
   */
  private bindEvents() {}

  /**
   * 初始化各种 controller
   */
  private initControllers() {}

  /**
   * 渲染，更新和渲染的逻辑使用同一个。
   */
  public render() {
    this.paint();
  }

  /**
   * 具体的绘制渲染逻辑，主要包含几个事情：
   * 1. 做数据的过滤（filter 的状态存储）
   * 2. 创建 scale
   * 3. 当前 view 的 geometry.init
   * 4. 当前 view 的 component.init
   * 5. 处理分面
   */
  protected paint() {
    // 处理 filter
    this.processFilter();
    // // 创建 scale
    // this.createScales();
    // // 初始化当前 Geometry
    // this.initGeometryes();
    // // 初始化组件
    // this.initComponents();
    // // 分面
    // this.processFacet();
  }

  private processFilter() {
    const { originalData, filters } = this.options;

    // 不存在 filters，则不需要进行数据过滤
    if (size(filters) === 0) {
      this.filteredData = originalData;
    } else {
      // 存在过滤器，则逐个执行过滤，过滤器之间是 与 的关系
      this.filteredData = filter(originalData, (datum: Datum, idx: number) => {
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
    return this.filteredData;
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
  public getOptions(): ViewOptions {
    return this.options;
  }

  /**
   * 获得容器中包含的 element 元素
   * @param recursive 是否递归对应的子 views
   */
  public getElements(recursive?: boolean): Element[] {
    return [];
  }

  /** 数据操作的一些 API  **************************************** */

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
  public filter(field: string, condition?: FilterCondition): View {
    if (isFunction(condition)) {
      set(this.options, ['filters', field], condition);
    } else if (!condition) {
      // condition 为空，则表示删除过滤条件
      delete this.options.filters[field];
    }

    return this;
  }

  /**
   * 更新数据（数据分析：下钻）
   */
  public changeData() {}

  /**
   *  设置数据的状态（数据分析：联动）
   */
  public state() {}
}
