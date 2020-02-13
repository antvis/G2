import { COMPONENT_TYPE, DIRECTION, LAYER } from './constant';

import {
  AxisLabelCfg,
  AxisLineCfg,
  AxisSubTickLineCfg,
  AxisTickLineCfg,
  AxisTitleCfg,
  ContinueLegendHandlerCfg,
  ContinueLegendLabelCfg,
  ContinueLegendRailCfg,
  ContinueLegendTrackCfg,
  Coordinate,
  CrosshairLineCfg,
  CrosshairTextBackgroundCfg,
  CrosshairTextCfg,
  GridLineCfg,
  GroupComponent,
  HtmlComponent,
  ICanvas,
  IGroup,
  IShape,
  LegendBackgroundCfg,
  LegendItemNameCfg,
  LegendItemValueCfg,
  LegendMarkerCfg,
  LegendTitleCfg,
  PathCommand,
  Scale,
  ScaleConfig,
  ShapeAttrs,
} from './dependents';

import { View } from './chart';
import { Facet } from './facet';
import Element from './geometry/element';

// ============================ 基础类型 ============================
/** 对象 */
export interface LooseObject {
  [key: string]: any;
}

/** 一个点位置 */
export interface Point {
  readonly x: number;
  readonly y: number;
}

/** 画布范围 */
export interface Region {
  readonly start: Point;
  readonly end: Point;
}

/** 画布大小 */
export interface Size {
  readonly width: number;
  readonly height: number;
}

export interface RangePoint {
  readonly x?: number | number[];
  readonly y?: number | number[];
}

// 用户数据经过图形映射处理后的数据结构
export interface MappingDatum {
  /** raw data */
  _origin: Datum;
  /** the key points of the shape */
  points?: ShapeVertices;
  /** the key points of next shape */
  nextPoints?: ShapeVertices;
  /** value in the x direction */
  x?: number[] | number;
  /** value in the y direction */
  y?: number[] | number;
  color?: string;
  shape?: string | string[];
  size?: number;
}

// 绘制 Shape 需要的图形、样式、关键点等信息
export interface ShapeInfo {
  /** x 坐标 */
  x: number | number[];
  /** y 坐标 */
  y: number | number[];
  /** 映射的 shape 类型 */
  shape?: string | string[];
  /** size 映射值 */
  size?: number;
  /** 映射的颜色值 */
  color?: string;
  /** 用户设置的图形样式 */
  style?: LooseObject;
  /** 是否在极坐标下 */
  isInCircle?: boolean;
  /** 对应的原始数据记录 */
  data?: Datum | Data;
  /** 存储进行图形映射后的数据 */
  mappingData?: MappingDatum | MappingDatum[];
  /** 构成 shape 的关键点  */
  points?: ShapeVertices;
  /** 下一个数据集对应的关键点 */
  nextPoints?: ShapeVertices;
  /** Geometry.Text 需要 */
  text?: string;
  /** 数据是否发生层叠 */
  isStack?: boolean;
  /** 是否连接空值，对 Path Line Area 这三种 Geometry 生效 */
  connectNulls?: boolean;
  /** 默认的 shape 样式 */
  defaultStyle?: LooseObject;
}

// 用户配置的动画，属性均可选
export interface AnimateCfg {
  /** 动画缓动函数 */
  readonly easing?: string | AnimateEasingCallback;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画执行时间 */
  readonly duration?: number | AnimateDurationCallback;
  /** 动画延迟时间 */
  readonly delay?: number | AnimateDelayCallback;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}

// 传递给 G 的动画配置，duration 必须提供
export interface GAnimateCfg {
  /** 动画执行时间 */
  readonly duration: number;
  /** 动画缓动函数 */
  readonly easing?: string;
  /** 动画执行函数 */
  readonly animation?: string;
  /** 动画延迟时间 */
  readonly delay?: number;
  /** 动画执行结束后的回调函数 */
  readonly callback?: () => any;
}

// ============================ Geometry 接口相关的类型定义 ============================
/** 图形属性配置项定义，如 geometry.position({}) */
export interface AttributeOption {
  /** 映射的属性字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: (...args) => any;
  /** 指定常量映射规则。 */
  values?: any[];
}

/** 数据调整配置项定义，`geometry.adjust({})` */
export interface AdjustOption {
  /** 数据调整类型。 */
  readonly type: AdjustType;
  /**
   * 该属性只对 'dodge' 类型生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距。
   *
   * ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ps3pToOg2nwAAAAAAAAAAABkARQnAQ)
   */
  readonly marginRatio?: number;
  /**
   * 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据。
   */
  readonly dodgeBy?: string;
  /**
   * 该属性只对 'stack' 类型生效，用于控制是否对数据进行反序操作。
   */
  readonly reverseOrder?: boolean;
}

/** `geometry.style({})` 样式配置定义 */
export interface StyleOption {
  /** 映射的字段。 */
  readonly fields?: string[];
  /** 回调函数。 */
  readonly callback?: (...args) => LooseObject;
  /** 图形样式配置。 */
  readonly cfg?: LooseObject;
}

/** `geometry.tooltip({})` Tooltip 配置定义 */
export interface GeometryTooltipOption {
  /** 参与映射的字段。 */
  readonly fields: string[];
  /** 回调函数。 */
  readonly callback?: (...args) => LooseObject;
}

export interface GeometryLabelLayoutCfg {
  /** label 布局类型。 */
  type: string;
  /** 各个布局函数开放给用户的配置。 */
  cfg?: LooseObject;
}

/** geometry.label({}) 配置属性 */
export interface GeometryLabelCfg {
  /**
   * 用于声明渲染的 label 类型。
   * 当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染。
   */
  type?: string;
  /** 相对数据点的偏移距离。 */
  offset?: number;
  /** label 相对于数据点在 X 方向的偏移距离。 */
  offsetX?: number;
  /** label 相对于数据点在 Y 方向的偏移距离。 */
  offsetY?: number;
  /**
   * 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示。
   * 当 content 为 IGroup 或者 IShape 类型时，请使用相对定位，即 x 和 y 坐标都设为 0，G2 内部会整体做最后的 label 进行定位的。
   * 示例： https://g2.antv.vision/zh/examples/pie/basic#pie-custome-label
   */
  content?: string | IGroup | IShape | GeometryLabelContentCallback;
  /** label 文本图形属性样式。 */
  style?: LooseObject;
  /** label 是否自动旋转，默认为 true。 */
  autoRotate?: boolean;
  /**
   * 当且仅当 `autoRotate` 为 false 时生效，用于设置文本的旋转角度，**弧度制**。
   */
  rotate?: number;
  /**
   * 用于设置文本连接线的样式属性，null 表示不展示。
   */
  labelLine?: null | boolean | { style?: object };
  /** 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭。 */
  labelEmit?: boolean;
  /**
   * 文本布局类型，支持多种布局函数组合使用。
   *
   * 目前提供了三种：'overlap'，'fixedOverlap'，'limitInShape'：
   * 1. overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。
   * 2. fixedOverlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整。
   * 3. limitInShape: 剔除 shape 容纳不了的 label。
   *
   * @example
   * ```ts
   * layout: {
   *   type: 'overlap',
   * },
   * ```
   */
  layout?: GeometryLabelLayoutCfg | GeometryLabelLayoutCfg[];
  /**
   * 仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置。
   */
  position?:
  | ((data: Datum, mappingData: MappingDatum, index: number) => IntervalGeometryLabelPosition)
  | IntervalGeometryLabelPosition;
  /** 动画配置。 */
  animate?: AnimateOption | false | null;
}

/** `geometry().label({})` 配置定义 */
export interface LabelOption {
  /** 映射的字段。 */
  fields?: string[];
  /** 回调函数。 */
  callback?: LabelCallback;
  cfg?: GeometryLabelCfg;
}

export interface StateCfg {
  /** 动画参数配置，null 表示关闭动画。 */
  animate?: GAnimateCfg | null;
  /** 状态样式配置。 */
  style?: object | StateStyleCallback;
}

/** geometry.state({}) 配置定义 */
export interface StateOption {
  /** 默认状态样式。 */
  default?: StateCfg;
  /** active 状态配置。 */
  active?: StateCfg;
  /** inactive 状态配置。 */
  inactive?: StateCfg;
  /** selected 状态配置。 */
  selected?: StateCfg;
};

type IntervalGeometryLabelPosition = 'top' | 'bottom' | 'middle' | 'left' | 'right';
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
/** geometry.color() 图形属性回调函数定义 */
export type ColorAttrCallback = (...args) => string;
/** geometry.shape() 图形属性回调函数定义 */
export type ShapeAttrCallback = (...args) => string | any[];
/** geometry.size() 图形属性回调函数定义 */
export type SizeAttrCallback = (...args) => number;
/** geometry.tooltip() 接口回调函数定义 */
export type TooltipCallback = (...args) => LooseObject;
/** geometry.style() 接口回调函数定义 */
export type StyleCallback = (...args) => LooseObject;
/** geometry.label() 接口回调函数定义 */
export type LabelCallback = (...args) => GeometryLabelCfg | null | undefined;
/** geometry label 中 content 属性的回调函数类型定义 */
export type GeometryLabelContentCallback = (data: Datum, mappingData: MappingDatum, index: number) => string | IShape | IGroup;
/** state 下 style 回调函数定义 */
export type StateStyleCallback = (element: Element) => LooseObject;


// ============================ Geometry Shape 接口相关的类型定义 ============================
export interface ShapeMarkerCfg {
  /** 颜色。 */
  color: string;
  /** 是否是极坐标。 */
  isInPolar: boolean;
}

/** 图形 marker 的配置信息。 */
export interface ShapeMarkerAttrs {
  /** marker 的形状。 */
  symbol: string | ShapeMarkerSymbol;
  /** marker 的样式。 */
  style: ShapeAttrs;
}

/** shape 关键点信息 */
export interface ShapePoint {
  /** 数据点映射后对应 x 的值。 */
  readonly x: number | number[];
  /** 数据点映射后对应 y 的值。 */
  readonly y?: number | number[];
  /** 数据在 y 方向的最小值。 */
  readonly y0?: number;
  size?: number;
}


/** 注册 ShapeFactory 需要实现的接口。 */
export interface RegisterShapeFactory {
  /** 默认的 shape 类型。 */
  readonly defaultShapeType: string;
  /** 返回绘制 shape 所有的关键点集合。 */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图配置。 */
  readonly getMarker?: (shapeType: string, markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 创建具体的 G.Shape 实例。 */
  readonly drawShape?: (shapeType: string, cfg: ShapeInfo, container: IGroup) => IShape | IGroup;
}

/** 注册具体 shape 需要实现的接口。 */
export interface RegisterShape {
  /** 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义。 */
  readonly getPoints?: (pointInfo: ShapePoint) => Point[];
  /** 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义。 */
  readonly getMarker?: (markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /** 绘制函数。 */
  readonly draw: (cfg: ShapeInfo, container: IGroup) => IShape | IGroup | void;
}

/** Shape 接口定义。 */
export interface Shape extends RegisterShape {
  /** 坐标系对象。 */
  coordinate: Coordinate;
  /** 工具函数，将 0～1 path 转化成实际画布 path。 */
  parsePath: (path: any) => PathCommand[];
  /** 工具函数，0～1 的坐标点转换成实际画布坐标点。 */
  parsePoint: (point: Point) => Point;
  /** 工具函数，0～1 的坐标点集合转换成实际画布坐标点集合。 */
  parsePoints: (points: Point[]) => Point[];
}

/** ShapeFactory 接口定义。 */
export interface ShapeFactory extends RegisterShapeFactory {
  /** 工厂名。 */
  geometryType: string;
  /** 坐标系对象。 */
  coordinate: Coordinate;
  /** ShapeFactory 下所有的主题样式。 */
  theme: LooseObject;
  /** 根据名称获取具体的 shape 对象。 */
  getShape: (shapeType: string | string[]) => Shape;
  /** 获取构成 shape 的关键点。 */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
}

export type ShapeMarkerSymbol = (x: number, y: number, r: number) => PathCommand[];


// ============================ Annotation 类型定义 ============================
type AnnotationPositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>
) => [number, number];
export type AnnotationPosition = [number | string, number | string] | Record<string, number | string> | AnnotationPositionCallback;

export interface AnnotationBaseOption {
  readonly type?: string;
  /** 指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层 */
  readonly top?: boolean;
  /** 图形样式属性 */
  readonly style?: object;
  /** 是否进行动画 */
  readonly animate?: boolean;
  /** x 方向的偏移量 */
  readonly offsetX?: number;
  /** y 方向的偏移量 */
  readonly offsetY?: number;
}

/** 使用 RegionPosition 定位的组件配置 */
export interface RegionPositionBaseOption extends AnnotationBaseOption {
  /** 起始位置 */
  readonly start: AnnotationPosition;
  /** 结束位置 */
  readonly end: AnnotationPosition;
}

/** 使用 PointPosition 定位的组件配置 */
export interface PointPositionBaseOption extends AnnotationBaseOption {
  /** Point 定位位置 */
  readonly position: AnnotationPosition;
}

export interface ImageOption extends RegionPositionBaseOption {
  /** 图片路径 */
  readonly src: string;
}

export interface LineOption extends RegionPositionBaseOption {
  readonly text?: {
    /** 文本位置，除了制定 'start', 'center' 和 'end' 外，还可以使用百分比进行定位， 比如 '30%' */
    readonly position: 'start' | 'center' | 'end' | string;
    /** 是否自动旋转 */
    readonly autoRotate?: boolean;
    /** 显示的文本内容 */
    readonly content: string;
    /** 文本的图形样式属性 */
    readonly style?: object;
    /** x 方向的偏移量 */
    readonly offsetX?: number;
    /** y 方向偏移量 */
    readonly offsetY?: number;
  };
}

export type ArcOption = RegionPositionBaseOption;

export type RegionOption = RegionPositionBaseOption;

export interface TextOption extends PointPositionBaseOption {
  /** 显示的文本内容 */
  readonly content: string | number;
  /** 文本的旋转角度，弧度制 */
  readonly rotate?: number;
}

export interface DataMarkerOption extends PointPositionBaseOption {
  /** point 设置 */
  readonly point?: null | { style?: object };
  /** line 设置 */
  readonly line?: null | { style?: object; length?: number };
  /** text 设置 */
  readonly text: null | { style?: object; content: string };
  /** 文本超出绘制区域时，是否自动调节文本方向，默认为 true */
  readonly autoAdjust?: boolean;
  /** 朝向，默认为 upward，可选值为 'upward' 或者 'downward' */
  readonly direction?: 'upward' | 'downward';
}

export interface DataRegionOption extends RegionPositionBaseOption {
  /** line长度，default为 0 */
  readonly lineLength?: number;
  /** 标注区间的配置 */
  readonly region?: null | { style?: object };
  /** 文本的配置 */
  readonly text?: null | { style?: object; content: string };
}

export interface RegionFilterOption extends RegionPositionBaseOption {
  /** 染色色值 */
  readonly color: string;
  /* 可选,设定regionFilter只对特定geom类型起作用，如apply:['area'] */
  readonly apply?: string[];
}

// ============================ Chart && View 上的类型定义 ============================
interface TooltipDomStyles {
  'g2-tooltip'?: LooseObject;
  'g2-tooltip-title'?: LooseObject;
  'g2-tooltip-list'?: LooseObject;
  'g2-tooltip-list-item'?: LooseObject;
  'g2-tooltip-marker'?: LooseObject;
  'g2-tooltip-value'?: LooseObject;
  'g2-tooltip-name'?: LooseObject;
}

// 目前组件动画只允许以下参数的配置
interface ComponentAnimateCfg {
  /** 动画执行时间 */
  readonly duration?: number;
  /** 动画缓动函数 */
  readonly easing?: string;
  /** 动画延迟时间 */
  readonly delay?: number;
}

interface ComponentAnimateOption {
  /** 初入场动画配置 */
  appear?: ComponentAnimateCfg;
  /** 更新动画配置 */
  update?: ComponentAnimateCfg;
  /** 更新后新入场的动画配置 */
  enter?: ComponentAnimateCfg;
  /** 离场动画配置 */
  leave?: ComponentAnimateCfg;
}

/** 列定义配置项 */
export interface ScaleOption extends ScaleConfig {
  /** 声明度量类型。  */
  type?: ScaleType;
  /**
   * 同步 scale。
   *
   * @example
   * ```ts
   * chart.scale({
   *   x: { sync: true },
   *   y: { sync: true },
   *   x1: { sync: 'x1' },
   *   x2: { sync: 'x1' },
   * });
   * ```
   *
   * 通过以上配置，我们会分别对 x 和 y 两个字段，x1 和 x2 两个字段进行同步度量操作。
   */
  sync?: boolean | string;
  /**
   * 只对 type: 'time' 的 scale 生效，强制显示最后的日期 tick。
   */
  showLast?: boolean;
}

export interface AnimateOption {
  /** chart 初始化渲染时的入场动画，false/null 表示关闭入场动画。 */
  appear?: AnimateCfg | false | null;
  /** chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画。 */
  enter?: AnimateCfg | false | null;
  /** 更新动画配置，false/null 表示关闭更新动画。 */
  update?: AnimateCfg | false | null;
  /** 销毁动画配置，false/null 表示关闭销毁动画。 */
  leave?: AnimateCfg | false | null;
}

// 用于配置项式声明交互行为
export interface InteractionOption {
  /** 交互名称 */
  type: string;
  /** 交互配置 */
  cfg?: LooseObject;
}

// 用于配置项式的创建方式
export interface GeometryOption {
  /** Geometry 的类型。 */
  type: 'interval' | 'line' | 'path' | 'point' | 'area' | 'polygon' | 'schema' | 'edge' | 'heatmap' | string;
  /** position 通道映射规则，对应 `geometry.position()`。 */
  position: string | AttributeOption;
  /** color 通道映射规则，对应 `geometry.color()`。 */
  color?: string | AttributeOption;
  /** shape 通道映射规则，对应 `geometry.shape()`。 */
  shape?: string | AttributeOption;
  /** size 通道映射规则，对应 `geometry.size()`。 */
  size?: number | string | AttributeOption;
  /** adjust 数据调整方式，对应 `geometry.adjust()`。 */
  adjust?: string | string[] | AdjustOption | AdjustOption[];
  /** style 样式配置，对应 `geometry.size()`。 */
  style?: StyleOption | LooseObject;
  /** tooltip 配置，对应 `geometry.tooltip()`。 */
  tooltip?: GeometryTooltipOption | boolean | string;
  /** Geometry 动画配置，对应 `geometry.animate()`。 */
  animate?: AnimateOption | boolean;
  /** Label 配置，对应 `geometry.label()`。 */
  label?: LabelOption | false | string;
  /** state 样式配置，对应 `geometry.state()`。 */
  state?: StateOption;
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
  /** view 的绘制范围，起始点为左上角。 */
  readonly region?: Region;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: Padding;
  /** 设置主题。 */
  readonly theme?: object | string;
  /** 是否可见。 */
  readonly visible?: boolean;
  /**
   * 图表组件、图形映射等相关的配置。
   */
  readonly options?: Options;
}

// chart 构造方法的入参
export interface ChartCfg {
  /** 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。 */
  readonly container: string | HTMLElement;
  /** 图表宽度。 */
  readonly width?: number;
  /** 图表高度。 */
  readonly height?: number;
  /**
   * 图表是否自适应容器宽高，默认为 false，用户需要手动设置 width 和 height。
   * 当 `autoFit: true` 时，会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。
   */
  readonly autoFit?: boolean;
  /** 指定渲染引擎，默认使用 canvas。 */
  readonly renderer?: Renderer;
  /** 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。 */
  readonly pixelRatio?: number;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: ViewPadding;
  /**
   * 是否开启局部刷新，默认开启。
   */
  readonly localRefresh?: boolean;
  /**
   * chart 是否可见，默认为 true，设置为 false 则会隐藏。
   */
  readonly visible?: boolean;
  /**
   * 当使用配置项式创建 chart 时使用，详见 [配置项式创建图表教程](docs/tutorial/schema)。
   */
  readonly options?: Options;
  /**
   * 配置图表默认交互，仅支持字符串形式。
   */
  defaultInteractions?: string[];
}

// view 构造参数
export interface ViewCfg {
  /** 当前 view 的父级 view。 */
  readonly parent: View;
  /** canvas 实例。 */
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
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: ViewPadding;
  /** 设置 view 实例主题。 */
  readonly theme?: object | string;
  /**
   * 图表组件、图形映射等相关的配置。
   */
  readonly options?: Options;
  /** 是否可见。 */
  readonly visible?: boolean;
}

/**
 * @ignore
 * 组件及布局的信息
 */
export interface ComponentOption {
  readonly id?: string;
  readonly component: GroupComponent | HtmlComponent;
  readonly layer: LAYER;
  direction: DIRECTION;
  readonly type: COMPONENT_TYPE;
  /* 其他的额外信息 */
  readonly extra?: any;
}

interface MarkerCfg extends LegendMarkerCfg {
  /** 配置图例 marker 的 symbol 形状。 */
  symbol?: Marker | MarkerCallback;
}

export interface LegendItem {
  /**
   * 唯一值，用于动画或者查找
   */
  id?: string;
  /** 名称 */
  name: string;
  /** 值 */
  value: any;
  /** 图形标记 */
  marker?: MarkerCfg;
}

/**
 * 图例项配置
 */
export interface LegendCfg {
  /**
   * 是否为自定义图例，当该属性为 true 时，需要声明 items 属性。
   */
  readonly custom?: boolean;
  /**
   * 布局方式： horizontal，vertical
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * 图例标题配置，默认不展示。
   */
  title?: LegendTitleCfg;
  /**
   * 背景框配置项。
   */
  background?: LegendBackgroundCfg;
  /** 图例的位置。 */
  position?:
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';
  /** 动画开关，默认关闭。 */
  animate?: boolean;
  /** 动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。 */
  animateOption?: ComponentAnimateOption;
  /**
   * **分类图例适用**，控制图例项水平方向的间距。
   */
  itemSpacing?: number;
  /**
   * **分类图例适用**，图例项的宽度, 默认为 null，自动计算。
   */
  itemWidth?: number;
  /**
   * **分类图例适用**，图例的高度，默认为 null。
   */
  itemHeight?: number;
  /**
   * **分类图例适用**，图例项 name 文本的配置。
   */
  itemName?: LegendItemNameCfg;
  /**
   * **分类图例适用**，图例项 value 附加值的配置项。
   */
  itemValue?: LegendItemValueCfg;
  /**
   * **分类图例适用**，图例项最大宽度设置。
   */
  maxWidth?: number;
  /**
   * **分类图例适用**，图例项最大高度设置。
   */
  maxHeight?: number;
  /**
   * **分类图例适用**，图例项的 marker 图标的配置。
   */
  marker?: MarkerCfg;
  /**
   * **适用于分类图例**，当图例项过多时是否进行分页。
   */
  flipPage?: boolean;
  /**
   * **分类图例适用**，用户自己配置图例项的内容。
   */
  items?: LegendItem[];
  /**
   * **分类图例适用**，是否将图例项逆序展示。
   */
  reversed?: boolean;

  /**
   * **连续图例适用**，选择范围的最小值。
   */
  min?: number;
  /**
   * **连续图例适用**，选择范围的最大值。
   */
  max?: number;
  /**
   * **连续图例适用**，选择的值。
   */
  value?: number[];
  /**
   * **连续图例适用**，选择范围的色块样式配置项。
   */
  track?: ContinueLegendTrackCfg;
  /**
   * **连续图例适用**，图例滑轨（背景）的样式配置项。
   */
  rail?: ContinueLegendRailCfg;
  /**
   * **连续图例适用**，文本的配置项。
   */
  label?: ContinueLegendLabelCfg;
  /**
   * **连续图例适用**，滑块的配置项。
   */
  handler?: ContinueLegendHandlerCfg;
  /**
   * **连续图例适用**，滑块是否可以滑动。
   */
  slidable?: boolean;
  /** 图例 x 方向的偏移。 */
  offsetX?: number;
  /** 图例 y 方向的偏移。 */
  offsetY?: number;
}

interface TooltipCrosshairsText extends CrosshairTextCfg {
  /** crosshairs 文本内容 */
  content?: string;
}

/**
 * 辅助线文本回调函数
 * @param type 对应当前 crosshairs 的类型，值为 'x' 或者 'x'
 * @param defaultContent 对应当前 crosshairs 默认的文本内容
 * @param items 对应当前 tooltip 内容框中的数据
 * @param currentPoint 对应当前坐标点
 * @returns 返回当前 crosshairs 对应的辅助线文本配置
 */
type TooltipCrosshairsTextCallback = (type: string, defaultContent: any, items: any[], currentPoint: Point) => TooltipCrosshairsText;
export interface TooltipCrosshairs {
  /**
   * crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项。
   * 以下是在不同坐标系下，crosshairs 各个类型的表现：
   *
   * | 坐标系 | type = 'x' | type = 'xy' | type = 'y' |
   * | ------------ | ------------- | ------------- |
   * | 直角坐标系  | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jmUBQ4nbtXsAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*RpWXT76ZSQgAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Xjl8TLIJLuUAAAAAAAAAAABkARQnAQ) |
   * | 极坐标 | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zbMVSoKTyFsAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*k5EYRJspET0AAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*n_TKQpUaXWEAAAAAAAAAAABkARQnAQ) |
   */
  type?: 'x' | 'y' | 'xy';
  /** 辅助线的样式配置。 */
  line?: CrosshairLineCfg;
  /**
   * 辅助线文本配置，支持回调。
   */
  text?: TooltipCrosshairsText | TooltipCrosshairsTextCallback;
  /** 辅助线文本背景配置。 */
  textBackground?: CrosshairTextBackgroundCfg;
}

export interface TooltipCfg {
  /** 设置 tooltip 是否跟随鼠标移动，默认为 false, 定位到数据点。 */
  follow?: boolean;
  /** 是否展示 tooltip 标题。 */
  showTitle?: boolean;
  /**
   * 设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。
   */
  title?: string;
  /** 设置 tooltip 的固定展示位置，相对于数据点。 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。 */
  shared?: boolean; // 是否只展示单条数据
  /** 是否展示 crosshairs。 */
  showCrosshairs?: boolean;
  /** 配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。 */
  crosshairs?: TooltipCrosshairs;
  /** 是否渲染 tooltipMarkers。 */
  showMarkers?: boolean;
  /** tooltipMarker 的样式配置。 */
  marker?: object;
  /** 自定义 tooltip 的容器。 */
  container?: string | HTMLElement;
  /** 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。 */
  containerTpl?: string;
  /** 每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。 */
  itemTpl?: string;
  /** 传入各个 dom 的样式。 */
  domStyles?: TooltipDomStyles;
  /** tooltip 偏移量。 */
  offset?: number;
}

/** 坐标系配置 */
export interface CoordinateOption {
  /** 坐标系类型 */
  type?: 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix';
  /** 坐标系配置项，目前常用于极坐标。 */
  cfg?: CoordinateCfg;
  /**
   * 坐标系变换操作:
   * 1. rotate 表示旋转，使用弧度制。
   * 2. scale 表示沿着 x 和 y 方向的缩放比率。
   * 3. reflect 表示沿 x 方向镜像或者沿 y 轴方向映射。
   * 4. transpose 表示 x，y 轴置换。
   */
  actions?: CoordinateActions[];
}

export interface CoordinateCfg {
  /**
   * 用于极坐标，配置起始弧度。
   */
  startAngle?: number;
  /**
   * 用于极坐标，配置结束弧度。
   */
  endAngle?: number;
  /**
   * 用于极坐标，配置极坐标半径，0 - 1 范围的数值。
   */
  radius?: number;
  /**
   * 用于极坐标，极坐标内半径，0 -1 范围的数值。
   */
  innerRadius?: number;
}

export interface AxisGridCfg {
  /**
   * 线的样式。
   */
  line?: GridLineCfg;
  /**
   * 两个栅格线间的填充色。
   */
  alternateColor?: string | string[];
  /**
   * 对于 circle 是否关闭 grid。
   */
  closed?: boolean;
  /**
   * 是否同刻度线对齐，如果值为 false，则会显示在两个刻度中间。
   * ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*YX6fS4GTTvMAAAAAAAAAAABkARQnAQ)
   */
  alignTick?: boolean;
}

export interface AxisCfg {
  /**
   * 适用于直角坐标系，设置坐标轴的位置。
   */
  position?: 'top' | 'bottom' | 'right' | 'left';
  /**
   * 坐标轴线的配置项，null 表示不展示。
   */
  line?: AxisLineCfg | null;
  /**
   * 坐标轴刻度线线的配置项，null 表示不展示。
   */
  tickLine?: AxisTickLineCfg | null;
  /**
   * 坐标轴子刻度线的配置项，null 表示不展示。
   */
  subTickLine?: AxisSubTickLineCfg | null;
  /**
   * 标题的配置项，null 表示不展示。
   */
  title?: AxisTitleCfg | null;
  /**
   * 文本标签的配置项，null 表示不展示。
   */
  label?: AxisLabelCfg | null;
  /** 坐标轴网格线的配置项，null 表示不展示。 */
  grid?: AxisGridCfg | null;
  /** 动画开关，默认开启。 */
  animate?: boolean;
  /** 动画参数配置。 */
  animateOption?: ComponentAnimateOption;
  /** 标记坐标轴 label 的方向，左侧为 1，右侧为 -1。 */
  verticalFactor?: number;
}

export interface Options {
  /** 数据源配置。 */
  readonly data: Data;
  /** 设置数据过滤条件，以 data 中的数据属性为 key。 */
  readonly filters?: Record<string, FilterCondition>;
  /** 坐标轴配置，以 data 中的数据属性为 key。 */
  readonly axes?: Record<string, AxisOption> | boolean;
  /** 图例配置，以 data 中的数据属性为 key。 */
  readonly legends?: Record<string, LegendOption> | boolean;
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key。 */
  readonly scales?: Record<string, ScaleOption>;
  /** Tooltip 配置。 */
  readonly tooltip?: TooltipOption;
  /** 坐标系配置。 */
  readonly coordinate?: CoordinateOption;
  /** 静态辅助元素声明。 */
  readonly annotations?: Array<
    ArcOption |
    RegionFilterOption |
    ImageOption |
    LineOption |
    TextOption |
    RegionOption |
    DataMarkerOption |
    DataRegionOption>;
  /** Geometry 配置 */
  readonly geometries?: GeometryOption[];
  /** 开启/关闭动画，默认开启 */
  readonly animate?: boolean;
  /** 配置需要使用的交互行为 */
  readonly interactions?: InteractionOption[];

  /** 其他自定义的 option */
  readonly [name: string]: any;

  /** 子 View */
  readonly views?: ViewOption[];
}

type Marker =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'triangleDown'
  | 'hexagon'
  | 'bowtie'
  | 'cross'
  | 'tick'
  | 'plus'
  | 'hyphen'
  | 'line';
type MarkerCallback = (x: number, y: number, r: number) => PathCommand;
export type TooltipOption = TooltipCfg | boolean;
/* 筛选器函数类型定义 */
export type FilterCondition = (value: any, datum: Datum) => boolean;
export type AxisOption = AxisCfg | boolean;
export type LegendOption = LegendCfg | boolean;
export type ScaleType =
  'linear' |
  'cat' |
  'category' |
  'identity' |
  'log' |
  'pow' |
  'time' |
  'timeCat' |
  'quantize' |
  'quantile';

type CoordinateRotate = ['rotate', number];
type CoordinateReflect = ['reflect', 'x' | 'y'];
type CoordinateScale = ['scale', number, number];
type CoordinateTranspose = ['transpose'];
export type CoordinateActions = CoordinateRotate | CoordinateReflect | CoordinateScale | CoordinateTranspose;

// ============================ Facet 分面相关类型定义 ============================
// 分面基类
export type FacetCtor = new (view: View, cfg: any) => Facet;

export interface Condition {
  readonly field: string;
  readonly value: any;
  readonly values: any[];
}

export type FacetDataFilter = (data: Datum[]) => boolean;

/**
 * 默认的基础配置
 */
export interface FacetCfg<D> {
  /** 布局类型。 */
  readonly type?: string;
  /** view 创建回调。 */
  readonly eachView: (innerView: View, facet?: D) => any;
  /** facet view padding。 */
  readonly padding?: ViewPadding;
  /** 是否显示标题。 */
  readonly showTitle?: boolean;
  /** facet 数据划分维度。 */
  readonly fields: string[];
}

/**
 * Facet title 配置项
 */
export interface FacetTitle {
  /** x 方向偏移。 */
  readonly offsetX?: number;
  /** y 方向偏移。 */
  readonly offsetY?: number;
  /** 文本样式。 */
  readonly style?: object;
}

/**
 * 分面数据
 */
export interface FacetData {
  /** 分面类型。 */
  readonly type: string;
  /** 当前分面子 view 的数据。 */
  readonly data: object[];
  /** 当前分面子 view 的范围。 */
  readonly region: Region;
  /** 当前分面子 view 的 padding。 */
  readonly padding?: number;
  /** 当前 facet 对应生成的 view。 */
  view?: View;

  // facet data
  /** 分面行字段。 */
  readonly rowField: string;
  /** 分面列字段。 */
  readonly columnField: string;
  /** 当前行分面的枚举值。 */
  readonly rowValue: string;
  /** 当前列分面的枚举值。 */
  readonly columnValue: string;
  /** 当前行索引。 */
  readonly rowIndex: number;
  /** 当前列索引。 */
  readonly columnIndex: number;
  /** 当前行字段的枚举值长度。 */
  readonly rowValuesLength: number;
  /** 当前列字段的枚举值长度。 */
  readonly columnValuesLength: number;
}

// ===================== rect 相关类型定义 =====================

export interface RectCfg extends FacetCfg<RectData> {
  /** 行标题的样式。 */
  readonly columnTitle?: FacetTitle,
  /** 列标题的样式。 */
  readonly rowTitle?: FacetTitle,
}

export interface RectData extends FacetData {

}

// ===================== mirror 相关类型定义 =====================

export interface MirrorCfg extends FacetCfg<MirrorData> {
  /** 是否转置。 */
  readonly transpose?: boolean;
  /** 标题样式。 */
  readonly title?: FacetTitle;
}

export interface MirrorData extends FacetData {
}

// ===================== list 相关类型定义 =====================

export interface ListCfg extends FacetCfg<ListData> {
  /** 指定每行可显示分面的个数，超出时会自动换行。 */
  readonly cols?: number;
  /** 每个分面标题配置。 */
  readonly title?: FacetTitle;
}

export interface ListData extends FacetData {
  readonly total: number;
}

// ===================== matrix 相关类型定义 =====================

export interface MatrixCfg extends FacetCfg<MirrorData> {
  /** 列标题的样式 */
  readonly columnTitle?: FacetTitle,
  /** 列标题的样式 */
  readonly rowTitle?: FacetTitle,
}

export interface MatrixData extends FacetData {
}

// ===================== circle 相关类型定义 =====================

export interface CircleCfg extends FacetCfg<CircleData> {
  /** 分面标题配置。 */
  readonly title?: FacetTitle;
}

export interface CircleData extends FacetData {
}

// ===================== tree 相关类型定义 =====================

export interface Line {
  readonly style?: ShapeAttrs,
  readonly smooth?: boolean;
}

export interface TreeCfg extends FacetCfg<TreeData> {
  readonly line?: Line;
  readonly title?: FacetTitle;
}

export interface TreeData extends FacetData {
  children?: TreeData[];
  originColIndex?: number;
}

/**
 * facet object map
 */
export interface FacetCfgMap {
  /** rect 类型分面配置 */
  readonly rect: RectCfg;
  /** mirror 类型分面配置 */
  readonly mirror: MirrorCfg;
  /** list 类型分面配置 */
  readonly list: ListCfg;
  /** matrix 类型分面配置 */
  readonly matrix: MatrixCfg;
  /** circle 类型分面配置 */
  readonly circle: CircleCfg;
  /** tree 类型分面配置 */
  readonly tree: TreeCfg;
}


// ============================ 交互相关的类型定义 ============================
/** 交互反馈的定义 */
export interface IAction {
  /**
   * 初始化
   */
  init();
  /**
   * 交互 action (反馈)的名称
   */
  name: string;
  /**
   * 上下文
   */
  context: IInteractionContext;
  /**
   * 销毁函数
   */
  destroy();
}

/** 交互上下文的接口定义 */
export interface IInteractionContext extends LooseObject {
  /** 事件对象 */
  event: LooseObject;
  /**
   * 当前的 view
   */
  view: View;
  /** 交互相关的 Actions */
  actions: IAction[];
  /**
   * 缓存属性，用于上下文传递信息
   * @param key 键名
   * @param value 值
   */
  cache(key: string, value?: any);
  /**
   * 获取 action
   * @param name - action 的名称
   * @returns 指定 name 的 Action
   */
  getAction(name): IAction;
  /**
   * 获取当前的点
   * @returns 返回当前的点
   */
  getCurrentPoint(): Point;
  /**
   * 获取当前的图形
   */
  getCurrentShape(): IShape;
  /**
   * 添加 action
   * @param action 指定交互 action
   */
  addAction(action: IAction);
  /**
   * 移除 action
   * @param action 移除的 action
   */
  removeAction(action: IAction);
  /**
   * 事件触发时是否在 view 内部
   */
  isInPlot();
  /**
   * 是否在组件的包围盒内
   * @param name 组件名，可省略
   */
  isInComponent(name?: string);
  /**
   * 是否在指定的图形内
   * @param name shape 的名称
   */
  isInShape(name);
  /**
   * 销毁
   */
  destroy();
}

/** G 的渲染类型 */
export type Renderer = 'svg' | 'canvas';
/** 数据的定义 */
export type Datum = Record<string, any>;
export type Data = Datum[];
export type ActionCallback = (context: IInteractionContext) => void;
export type Padding = number[];
export type ViewPadding = number | number[] | 'auto';
export type Position = [number, number];
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ShapeVertices = RangePoint[] | Point[] | Point[][];
/** easing 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateEasingCallback = (data: Datum) => string;
/** delay 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDelayCallback = (data: Datum) => number;
/** duration 的回调函数， 入参 data 为对应的原始数据记录 */
export type AnimateDurationCallback = (data: Datum) => number;
