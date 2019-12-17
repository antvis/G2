import { COMPONENT_TYPE, DIRECTION, LAYER } from '../constant';
import { GroupComponent, HtmlComponent } from '../dependents';
import { CategoryLegendCfg, CircleAxisCfg, ICanvas, IGroup, LineAxisCfg } from '../dependents';
import {
  AdjustOption,
  AttributeOption,
  LabelOption,
  StyleOption,
  TooltipOption as GeometryTooltipOption,
} from '../geometry/interface';
import { Interaction } from '../interaction/';
import { AnimateOption, Data, Datum, LooseObject, Padding, Region, Renderer, ScaleOption } from '../interface';
import { BaseOption, ImageOption, LineOption, TextOption } from './component/annotation';
import View from './view';

interface TooltipDomStyles {
  'g2-tooltip'?: LooseObject;
  'g2-tooltip-title'?: LooseObject;
  'g2-tooltip-list'?: LooseObject;
  'g2-tooltip-list-item'?: LooseObject;
  'g2-tooltip-marker'?: LooseObject;
  'g2-tooltip-value'?: LooseObject;
  'g2-tooltip-name'?: LooseObject;
  'g2-tooltip-crosshair-x'?: LooseObject;
  'g2-tooltip-crosshair-y'?: LooseObject;
}

// 用于配置项式的创建方式
export interface GeometryOption {
  /** Geometry 的类型 */
  type: 'interval' | 'line' | 'path' | 'point' | 'area' | 'polygon' | 'schema' | string;
  /** position 通道映射规则 */
  position: string | AttributeOption;
  /** color 通道映射规则 */
  color?: string | AttributeOption;
  /** shape 通道映射规则 */
  shape?: string | AttributeOption;
  /** size 通道映射规则 */
  size?: number | string | AttributeOption;
  /** adjust 数据调整方式 */
  adjust?: string | string[] | AdjustOption | AdjustOption[];
  /** style 样式配置 */
  style?: StyleOption | LooseObject;
  /** tooltip 配置 */
  tooltip?: GeometryTooltipOption | boolean | string;
  /** Geometry 动画配置 */
  animate?: AnimateOption | boolean;
  /** Label 配置 */
  label?: LabelOption | false | string;
  /** 其他配置 */
  cfg?: {
    /** 是否对数据进行排序 */
    sortable?: boolean;
    /** 是否可见 */
    visible?: boolean;
    /** 是否连接空值，仅对 'line', 'area' 和 'path' 生效 */
    connectNulls?: boolean;
  };
}

// 用于配置型式的声明方式
export interface ViewOption {
  /** view 的绘制范围 */
  readonly region?: Region;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jakjSL4dfRYAAAAAAAAAAABkARQnAQ)
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: Padding;
  /** 设置主题 */
  readonly theme?: object | string;
  /** 是否可见 */
  readonly visible?: boolean;
  /**
   * 图表组件、图形映射等相关的配置
   */
  readonly options?: Options;
}

// 用于配置项式声明交互行为
export interface InteractionOption {
  /** 交互名称 */
  type: string;
  /** 交互配置 */
  cfg?: LooseObject;
}

// chart 构造方法的入参
export interface ChartCfg {
  /** 指定 chart 绘制的 DOM */
  readonly container: string | HTMLElement;
  /** 图表宽度 */
  readonly width?: number;
  /** 图表高度 */
  readonly height?: number;
  /**
   * TODO: 规则需要确认
   * 图表是否自适应容器宽高，默认为 false
   */
  readonly autoFit?: boolean;
  /** 指定渲染引擎 */
  readonly renderer?: Renderer;
  /** 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio` */
  readonly pixelRatio?: number;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jakjSL4dfRYAAAAAAAAAAABkARQnAQ)
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: Padding;
  /**
   * 是否开启局部刷新，默认开启
   */
  readonly localRefresh?: boolean;
  /**
   * chart 是否可见，默认为 true，设置为 false 则会隐藏
   */
  readonly visible?: boolean;
  /**
   * 当使用配置项式创建 chart 时使用，详见 [配置项式创建图表教程](docs/tutorial/schema)
   */
  readonly options?: Options;
}

// view 构造参数
export interface ViewCfg {
  /** 当前 view 的父级 view */
  readonly parent: View;
  readonly canvas: ICanvas;
  /** 前景层 */
  readonly foregroundGroup: IGroup;
  /** 中间层 */
  readonly middleGroup: IGroup;
  /** 背景层 */
  readonly backgroundGroup: IGroup;
  /** view 的绘制范围 */
  readonly region?: Region;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jakjSL4dfRYAAAAAAAAAAABkARQnAQ)
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: Padding;
  /** 设置主题 */
  readonly theme?: object | string;
  /**
   * 图表组件、图形映射等相关的配置
   */
  readonly options?: Options;
  /** 是否可见 */
  readonly visible?: boolean;
}

// 组件及布局的信息
export interface ComponentOption {
  readonly component: GroupComponent | HtmlComponent;
  readonly layer: LAYER;
  readonly direction: DIRECTION;
  readonly type: COMPONENT_TYPE;
  /* 其他的额外信息 */
  readonly extra?: any;
}

export interface LegendCfg extends Partial<CategoryLegendCfg> {
  readonly position?: string;
}

export interface TooltipCfg {
  /** 是否展示 tooltip 标题 */
  showTitle?: boolean;
  /**
   * tooltip 触发方式
   * 'none' 表示不在 'mousemove' 或 'click' 时触发，用户可以通过 chart.showTooltip() 和 chart.hideTooltip() 来手动触发和隐藏
   */
  triggerOn?: 'mousemove' | 'click' | 'none';
  /** 设置 tooltip 的固定展示位置，相对于数据点 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** true 表示展示一组数据，false 表示展示单条数据 */
  shared?: boolean; // 是否只展示单条数据
  /** 是否展示 crosshairs */
  showCrosshairs?: boolean;
  /**
   * 设置 tooltip 辅助线的类型
   * 'x' 水平辅助线
   * 'y' 垂直辅助线
   * 'xy' 十字辅助线
   *
   */
  crosshairs?: 'x' | 'y' | 'xy';
  // title?: string;
  /** 是否自动渲染 tooltipMarkers，目前 line、area、path 会默认渲染 */
  showTooltipMarkers?: boolean;
  /** tooltipMarker 的样式 */
  tooltipMarker?: object;
  /** 自定义 tooltip 的容器 */
  container?: string | HTMLElement;
  /** 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class */
  containerTpl?: string;
  /** 每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class */
  itemTpl?: string;
  /** 根据 x 定位的 crosshair 的模板 */
  xCrosshairTpl?: string;
  /** 根据 y 定位的 crosshair 的模板 */
  yCrosshairTpl?: string;
  /** 是否允许鼠标进入 tooltip 内容框 */
  enterable?: boolean;
  /** 传入各个 dom 的样式 */
  domStyles?: TooltipDomStyles;
  /** tooltip 偏移量 */
  offset?: number;
}

export interface CoordinateOption {
  type?: 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix' | 'geo'; // 坐标系类型
  cfg?: CoordinateCfg; // 坐标系配置项
  actions?: any[][]; // 坐标系变换操作
}

export interface CoordinateCfg {
  // 极坐标系配置
  startAngle?: number; // 起始弧度
  endAngle?: number; // 结束弧度
  radius?: number; // 极坐标半径，0 - 1 范围的数值
  innerRadius?: number; // 极坐标内半径，0 -1 范围的数值

  // 地理坐标系配置
  zoom?: number; // 缩放等级，0 - 20 的数值范围
  center?: [number, number]; // 中心经纬度设置，比如 [ 120, 20 ]
}

export interface Options {
  /** 数据源 */
  readonly data: Data;
  /** 设置数据过滤条件，以 data 中的数据属性为 key */
  readonly filters?: Record<string, FilterCondition>;
  /** 坐标轴配置，以 data 中的数据属性为 key */
  readonly axes?: Record<string, AxisOption> | boolean;
  /** 图例配置，以 data 中的数据属性为 key */
  readonly legends?: Record<string, LegendOption> | boolean;
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key */
  readonly scales?: Record<string, ScaleOption>;
  /** Tooltip 配置 */
  readonly tooltip?: TooltipOption;
  /** 坐标系配置 */
  readonly coordinate?: CoordinateOption;
  /** 静态辅助元素声明 */
  readonly annotations?: Array<BaseOption | ImageOption | LineOption | TextOption>;
  /** Geometry 配置 */
  readonly geometries?: GeometryOption[];
  /** 开启/关闭动画，默认开启 */
  readonly animate?: boolean;
  /** 配置需要使用的交互行为 */
  readonly interactions?: InteractionOption[];
  /** 设置当前实例使用的组件插件 */
  readonly plugins?: string;

  /** 其他自定义的 option */
  readonly [name: string]: any;

  /** 子 View */
  readonly views?: ViewOption[];
}

export type TooltipOption = TooltipCfg | boolean;
/* 筛选器函数类型定义 */
export type FilterCondition = (value: any, datum: Datum) => boolean;
export type AxisOption = Partial<LineAxisCfg> | Partial<CircleAxisCfg> | boolean;
export type LegendOption = LegendCfg | boolean;
