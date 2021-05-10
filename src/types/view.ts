import { Data, Datum } from './common';
import { GeometryOption } from './geometry';

export type FilterCondition = (value: any, datum: Datum, idx?: number) => boolean;

export type AxisOption = any;
export type LegendOption = any;
export type TooltipOption = any;
export type SliderOption = any;
export type ScrollbarOption = any;
export type TimelineOption = any;

export type ScaleOption = any;
export type CoordinateOption = any;
export type ArcOption = any;
export type RegionFilterOption = any;

export type ViewOption = any;
export type FacetOption = any;

export type InteractionOption = any;

/**
 * 所有 view 的 API 设置的参数集中保存起来！
 */
export type Options = Partial<{
  /**
   * 数据源配置
   */
  data: Data;
  /** 数据源配置。 */
  /** 设置数据过滤条件，以 data 中的数据属性为 key。 */
  readonly filters: Record<string, FilterCondition>;
  /** 坐标轴配置，以 data 中的数据属性为 key。 */
  readonly axes: Record<string, AxisOption> | boolean;
  /** 图例配置，以 data 中的数据属性为 key。 */
  readonly legends: Record<string, LegendOption> | boolean;
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key。 */
  readonly scales: Record<string, ScaleOption>;
  /** Tooltip 配置。 */
  readonly tooltip: TooltipOption;
  /** 坐标系配置。 */
  readonly coordinate: CoordinateOption;
  /** 静态辅助元素声明。 */
  readonly annotations: (ArcOption | RegionFilterOption)[];
  /** Geometry 配置 */
  readonly geometries: GeometryOption[];
  /** 开启/关闭动画，默认开启 */
  readonly animate: boolean;
  /** 配置需要使用的交互行为 */
  readonly interactions: InteractionOption[];
  /** 缩略轴的配置 */
  readonly slider: SliderOption;
  /** 滚动条配置 */
  readonly scrollbar: ScrollbarOption;
  /** 子 View */
  readonly views: ViewOption[];
  /** 分面 */
  readonly facets: FacetOption[];
}>;
