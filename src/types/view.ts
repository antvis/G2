import type { View } from '../chart';
import type { AutoPadding, Data, Datum, Padding, Region } from './common';
import type { AxisAttrs, LegendAttrs, ScrollbarAttrs, SliderAttrs, TimelineAttrs, TooltipAttrs } from './component';
import type { GeometryOption } from './geometry';
import type { StyleSheet } from './theme';
import type { ScaleDefOptions } from './scale';

export type FilterCondition = (value: any, datum: Datum, idx?: number) => boolean;

export type AxisOption = AxisAttrs;
export type LegendOption = LegendAttrs;
export type TooltipOption = TooltipAttrs;
export type SliderOption = SliderAttrs;
export type ScrollbarOption = ScrollbarAttrs;
export type TimelineOption = TimelineAttrs;

export type CoordinateOption = any;
export type ArcOption = any;
export type RegionFilterOption = any;

export type ViewOption = any;
export type FacetOption = any;

export type InteractionOption = any;

export type SyncViewPaddingFn = (chart: View, views: View[], PC: any) => void;

/**
 * 所有 view 的 API 设置的参数集中保存起来！
 */
export type Options = Partial<{
  /**
   * 载入的原始数据
   */
  originalData: Data;
  /**
   * 数据源配置
   */
  data: Data;
  /** 数据源配置。 */
  /** 设置数据过滤条件，以 data 中的数据属性为 key。 */
  filters: Record<string, FilterCondition>;
  /** 坐标轴配置，以 data 中的数据属性为 key。 */
  axes: Record<string, AxisOption> | boolean;
  /** 图例配置，以 data 中的数据属性为 key。 */
  legends: Record<string, LegendOption> | boolean;
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key。 */
  scales: Record<string, ScaleDefOptions>;
  /** Tooltip 配置。 */
  tooltip: TooltipOption;
  /** 坐标系配置。 */
  coordinate: CoordinateOption;
  /** 静态辅助元素声明。 */
  annotations: (ArcOption | RegionFilterOption)[];
  /** Geometry 配置 */
  geometries: GeometryOption[];
  /** 开启/关闭动画，默认开启 */
  animate: boolean;
  /** 配置需要使用的交互行为 */
  interactions: InteractionOption[];
  /** 缩略轴的配置 */
  slider: SliderOption;
  /** 滚动条配置 */
  scrollbar: ScrollbarOption;
  /** 子 View */
  views: ViewOption[];
  /** 分面 */
  facets: FacetOption[];
}>;

/**
 * view 构造函数的参数
 */
export type ViewCfg = {
  /** View id，可以由外部传入 */
  id?: string;
  /** 当前 view 的父级 view */
  parent: View;
  /** canvas 实例 */
  canvas: any;
  /** 前景层 */
  foregroundGroup: any;
  /** 中间层 */
  middleGroup: any;
  /** 背景层 */
  backgroundGroup: any;
  /** view 的绘制范围 */
  region?: Region;
  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  limitInPlot?: boolean;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  padding?: AutoPadding;
  /**
   * 设置图表的内边距在padding的基础上增加appendPading的调整。
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  appendPadding?: Padding;
  /**
   * 是否同步子 view 的 padding，可以是 boolean / SyncViewPaddingFn
   * 比如:
   *  view1 的 padding 10
   *  view2 的 padding 20
   * 那么两个子 view 的 padding 统一变成最大的 20。
   *
   * 如果是 Funcion，则使用自定义的方式去计算子 view 的 padding，这个函数中去修改所有的 views autoPadding 值
   */
  syncViewPadding?: boolean | SyncViewPaddingFn;
  /**
   * 设置 view 实例主题: 主题名称或者主题样式表
   */
  theme?: string | StyleSheet;
  /**
   * 传入 options 配置。子 view 需要延续父 view 配置项
   */
  options?: Partial<Options>;
  /** 是否可见 */
  visible?: boolean;
};
