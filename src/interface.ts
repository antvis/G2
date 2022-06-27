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
  EnhancedTextCfg,
  GridLineCfg,
  GroupComponent,
  HtmlComponent,
  ICanvas,
  IGroup,
  IShape,
  CategoryLegendCfg,
  LegendBackgroundCfg,
  LegendItemNameCfg,
  LegendItemValueCfg,
  LegendMarkerCfg,
  LegendTitleCfg,
  LegendPageNavigatorCfg,
  PathCommand,
  Scale,
  ScaleConfig,
  ShapeAttrs,
  LineAnnotationTextCfg,
  TrendCfg,
} from './dependents';

import { View } from './chart';
import { Facet } from './facet';
import Element from './geometry/element';
import { PaddingCalCtor } from './chart/layout/padding-cal';
import { LegendRadio } from '@antv/component';

// ============================ 基础类型 ============================
/**
 * @title 通用对象
 */
export interface LooseObject {
  [key: string]: any;
}

/**
 * @title 一个点位置
 */
export interface Point {
  readonly x: number;
  readonly y: number;
}

/**
 * @title 画布范围
 */
export interface Region {
  readonly start: Point;
  readonly end: Point;
}

/**
 * @title 画布大小
 */
export interface Size {
  readonly width: number;
  readonly height: number;
}

/**
 * @title 带范围的点结构
 */
export interface RangePoint {
  readonly x?: number | number[];
  readonly y?: number | number[];
}

/**
 * WAI-ARIA 无障碍标签配置
 */
export type AriaOption =
  | false
  | {
      readonly label: string;
    };

/**
 * @title 用户数据经过图形映射处理后的数据结构
 */
export interface MappingDatum {
  /**
   * @title 原始数据
   */
  _origin: Datum;
  /**
   * @title shape 的关键点信息
   */
  points?: ShapeVertices;
  /**
   * @title 相对于当前 shape 的下一个 shape 的关键点信息
   */
  nextPoints?: ShapeVertices;
  /**
   * @title x 轴的坐标
   */
  x?: number[] | number;
  /**
   * @title y 轴的坐标
   */
  y?: number[] | number;
  /**
   * @title 颜色
   */
  color?: string;
  /**
   * @title 渲染的 shape 类型
   */
  shape?: string | string[];
  /**
   * @title 大小
   */
  size?: number;
}

/**
 * @title 绘制 Shape 需要的图形、样式、关键点等信息
 */
export interface ShapeInfo {
  /**
   * @title x 坐标
   */
  x: number | number[];
  /**
   * @title y 坐标
   */
  y: number | number[];
  /**
   * @title 映射的 shape 类型
   */
  shape?: string | string[];
  /**
   * @title size 映射值
   */
  size?: number;
  /**
   * @title 映射的颜色值
   */
  color?: string;
  /**
   * @title 用户设置的图形样式
   */
  style?: LooseObject;
  /**
   * @title 是否在极坐标下
   */
  isInCircle?: boolean;
  /**
   * @title 对应的原始数据记录
   */
  data?: Datum | Data;
  /**
   * @title 存储进行图形映射后的数据
   */
  mappingData?: MappingDatum | MappingDatum[];
  /**
   * @title 构成 shape 的关键点
   */
  points?: ShapeVertices;
  /**
   * @title 下一个数据集对应的关键点
   */
  nextPoints?: ShapeVertices;
  /**
   * @title Geometry.Text 需要
   */
  text?: string;
  /**
   * @title 数据是否发生层叠
   */
  isStack?: boolean;
  /**
   * @title 是否连接空值，只对 Path Line Area 这三种 Geometry 生效。
   */
  connectNulls?: boolean;
  /**
   * @title shape 背景，只对 Interval Geometry 生效，目前只对 interval-rect shape 生效。
   */
  background?: {
    style?: ShapeAttrs;
  };
  /**
   * @title 是否展示单个孤立的数据点，只对 Path Line Area 这三种 Geometry 生效。
   */
  showSinglePoint?: boolean;
  /**
   * @title 默认的 shape 样式
   */
  defaultStyle?: LooseObject;
  /**
   * @title 自定义的数据，传入到 shapeInfo 中
   */
  customInfo?: CustomOption;
}

/**
 * @title 用户配置的动画，属性均可选
 */
export interface AnimateCfg {
  /**
   * @title 动画缓动函数
   */
  readonly easing?: string | AnimateEasingCallback;
  /**
   * @title 动画执行函数
   */
  readonly animation?: string;
  /**
   * @title 动画执行时间
   */
  readonly duration?: number | AnimateDurationCallback;
  /**
   * @title 动画延迟时间
   */
  readonly delay?: number | AnimateDelayCallback;
  /**
   * @title 动画执行结束后的回调函数
   */
  readonly callback?: () => any;
  /**
   * @title 动画是否重复
   */
  readonly repeat?: boolean;
}

/**
 * @title 传递给 G 的动画配置，duration 必须提供
 */
export interface GAnimateCfg {
  /**
   * @title 动画执行时间
   */
  readonly duration: number;
  /**
   * @title 动画缓动函数
   */
  readonly easing?: string;
  /**
   * @title 动画执行函数
   */
  readonly animation?: string;
  /**
   * @title 动画延迟时间
   */
  readonly delay?: number;
  /**
   * @title 动画执行结束后的回调函数
   */
  readonly callback?: () => any;
  /**
   * @title 动画是否重复
   */
  readonly repeat?: boolean;
}

// ============================ Geometry 接口相关的类型定义 ============================
/**
 * @title 图形属性配置项定义，如 geometry.position({})
 */
export interface AttributeOption {
  /**
   * @title 映射的属性字段。
   */
  fields?: string[];
  /**
   * @title 回调函数。
   */
  callback?: (...args) => any;
  /**
   * @title 指定常量映射规则。
   */
  values?: any[];
}

/**
 * @title 数据调整配置项定义，`geometry.adjust({})`
 */
export interface AdjustOption {
  /**
   * @title 数据调整类型。
   */
  readonly type: AdjustType;
  /**
   * @title 间距
   * @description 该属性只对 'dodge' 类型生效，取 0 到 1 范围的值（相对于每个柱子宽度），用于控制一个分组中柱子之间的间距。
   * @see ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*ps3pToOg2nwAAAAAAAAAAABkARQnAQ)
   */
  readonly marginRatio?: number;
  /**
   * @title 分组字段
   * @description 该属性只对 'dodge' 类型生效，声明以哪个数据字段为分组依据。
   */
  readonly dodgeBy?: string;
  /**
   * @title 是否反序
   * @description 该属性只对 'stack' 类型生效，用于控制是否对数据进行反序操作。
   */
  readonly reverseOrder?: boolean;
}

/**
 * @title `geometry.style({})` 样式配置定义
 */
export interface StyleOption {
  /**
   * @title 映射的字段。
   */
  readonly fields?: string[];
  /**
   * @title 回调函数。
   */
  readonly callback?: (...args) => LooseObject;
  /**
   * @title 图形样式配置。
   */
  readonly cfg?: LooseObject;
}

/**
 * @title geometry.custom() custom 自定义的配置，可以传入任何数据
 */
export type CustomOption = any;

/**
 * @title `geometry.tooltip({})` Tooltip 配置定义
 */
export interface GeometryTooltipOption {
  /**
   * @title 参与映射的字段。
   */
  readonly fields: string[];
  /**
   * @title 回调函数。
   */
  readonly callback?: (...args) => LooseObject;
}

export interface GeometryLabelLayoutCfg {
  /**
   * @title label 布局类型。
   */
  type: string;
  /**
   * @title 各个布局函数开放给用户的配置。
   */
  cfg?: LooseObject;
}

/**
 * @title geometry.label({}) 配置属性
 */
export interface GeometryLabelCfg {
  /**
   * @title 类型
   * @description 用于声明渲染的 label 类型。当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染。
   */
  type?: string;
  /**
   * @title 相对数据点的偏移距离, polar 和 theta 坐标系下可使用百分比字符串。
   */
  offset?: number | string;
  /**
   * @title label 相对于数据点在 X 方向的偏移距离。
   */
  offsetX?: number;
  /**
   * @title label 相对于数据点在 Y 方向的偏移距离。
   */
  offsetY?: number;
  /**
   * @title 文本内容
   * @description 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示。当 content 为 IGroup 或者 IShape 类型时，请使用相对定位，即 x 和 y 坐标都设为 0，G2 内部会整体做最后的 label 进行定位的。
   * @link 示例： https://g2.antv.vision/zh/examples/pie/basic#pie-custome-label
   */
  content?: string | IGroup | IShape | GeometryLabelContentCallback;
  /**
   * @title 文本样式
   * @description label 文本图形属性样式。
   */
  style?: LooseObject;
  /**
   * @title 是否自动旋转
   * @description label 是否自动旋转
   * @default true
   */
  autoRotate?: boolean;
  /**
   * @title 旋转
   * @description 当且仅当 `autoRotate` 为 false 时生效，用于设置文本的旋转角度，**弧度制**。
   */
  rotate?: number;
  /**
   * @title 标签高度
   * @description 标签高度设置，仅当标签类型 type 为 pie 时生效；也可在主题中设置 pieLabels.labelHeight
   */
  labelHeight?: number;
  /**
   * @title 文本连接线
   * @description 用于设置文本连接线的样式属性，null 表示不展示。
   */
  labelLine?: null | boolean | { style?: object };
  /**
   * @title 文本放射状
   * @description 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭。
   */
  labelEmit?: boolean;
  /**
   * @title 文本布局
   * 文本布局类型，支持多种布局函数组合使用。
   *
   * 目前提供了三种：'overlap'，'fixedOverlap'，'limitInShape'：
   * 1. overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label。
   * 2. fixed-overlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整。
   * 3. limit-in-shape: 剔除 shape 容纳不了的 label。
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
   * @title 背景
   * @description 用于绘制 label 背景
   */
  background?: {
    /**
     * @title 背景框图形属性配置
     * - fill?: string; 背景框 填充色
     * - stroke?: string; 背景框 描边色
     * - lineWidth?: string; 背景框 描边宽度
     * - radius?: number | number[]; 背景框圆角，支持整数或数组形式
     */
    style?: ShapeAttrs;
    /**
     * @title 背景框 内边距
     */
    padding?: number | number[];
  };
  /**
   * @title 位置
   * @description 仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置。
   */
  position?:
    | ((data: Datum, mappingData: MappingDatum, index: number) => IntervalGeometryLabelPosition)
    | IntervalGeometryLabelPosition;
  /**
   * @title 动画配置。
   */
  animate?: AnimateOption | false | null;
}

/**
 * @title `geometry().label({})` 配置定义
 */
export interface LabelOption {
  /**
   * @title 映射的字段。
   */
  fields?: string[];
  /**
   * @title 回调函数。
   */
  callback?: LabelCallback;
  cfg?: GeometryLabelCfg;
}

/**
 * @title Geometry 下每个 state 的配置结构
 */
export interface StateCfg {
  /**
   * @title 状态样式配置。
   */
  style?: object | StateStyleCallback;
}

/**
 * @title geometry.state({}) 配置定义
 */
export interface StateOption {
  /**
   * @title 默认状态样式。
   */
  default?: StateCfg;
  /**
   * @title active 状态配置。
   */
  active?: StateCfg;
  /**
   * @title inactive 状态配置。
   */
  inactive?: StateCfg;
  /**
   * @title selected 状态配置。
   */
  selected?: StateCfg;
}

/**
 * @title interval label 的位置
 */
export type IntervalGeometryLabelPosition = 'top' | 'bottom' | 'middle' | 'left' | 'right';
/**
 * @title G2 提供的 adjust 类型
 */
export type AdjustType = 'stack' | 'jitter' | 'dodge' | 'symmetric';
/**
 * @title geometry.color() 图形属性回调函数定义
 */
export type ColorAttrCallback = (...args) => string;
/**
 * @title geometry.shape() 图形属性回调函数定义
 */
export type ShapeAttrCallback = (...args) => string | any[];
/**
 * @title geometry.size() 图形属性回调函数定义
 */
export type SizeAttrCallback = (...args) => number;
/**
 * @title geometry.tooltip() 接口回调函数定义
 */
export type TooltipCallback = (...args) => LooseObject;
/**
 * @title geometry.style() 接口回调函数定义
 */
export type StyleCallback = (...args) => LooseObject;
/**
 * @title geometry.label() 接口回调函数定义
 */
export type LabelCallback = (...args) => GeometryLabelCfg | null | undefined;
/**
 * @title geometry label 中 content 属性的回调函数类型定义
 */
export type GeometryLabelContentCallback = (
  data: Datum,
  mappingData: MappingDatum,
  index: number
) => string | IShape | IGroup;
/**
 * @title state 下 style 回调函数定义
 */
export type StateStyleCallback = (element: Element) => LooseObject;

// ============================ Geometry Shape 接口相关的类型定义 ============================
/**
 * @title 获取 shape marker 时需要的信息
 */
export interface ShapeMarkerCfg {
  /**
   * @title 颜色。
   */
  color: string;
  /**
   * @title 是否是极坐标。
   */
  isInPolar: boolean;
}

/**
 * @title 图形 marker 的配置信息。
 */
export interface ShapeMarkerAttrs {
  /**
   * @title marker 的形状。
   */
  symbol: string | ShapeMarkerSymbol;
  /**
   * @title marker 样式
   * @description
   * marker 的样式，`ShapeAttrs` 属性结构如下：
   *
   * ```ts
   * {
   *   // x 坐标
   *   x?: number;
   *   // y 坐标
   *   y?: number;
   *   // 圆半径
   *   r?: number;
   *   // 描边颜色
   *   stroke?: string | null;
   *   // 描边透明度
   *   strokeOpacity?: number;
   *   // 填充颜色
   *   fill?: string | null;
   *   // 填充透明度
   *   fillOpacity?: number;
   *   // 整体透明度
   *   opacity?: number;
   *   // 线宽
   *   lineWidth?: number;
   *   // 指定如何绘制每一条线段末端
   *   lineCap?: 'butt' | 'round' | 'square';
   *   // 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）
   *   lineJoin?: 'bevel' | 'round' | 'miter';
   *   // 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数，数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 setLineDash() 函数。
   *   lineDash?: number[] | null;
   *   // Path 路径
   *   path?: string | object[];
   *   // 图形坐标点
   *   points?: object[];
   *   // 宽度
   *   width?: number;
   *   // 高度
   *   height?: number;
   *   // 阴影模糊效果程度
   *   shadowBlur?: number;
   *   // 阴影颜色
   *   shadowColor?: string | null;
   *   // 阴影 x 方向偏移量
   *   shadowOffsetX?: number;
   *   // 阴影 y 方向偏移量
   *   shadowOffsetY?: number;
   *   // 设置文本内容的当前对齐方式
   *   textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
   *   // 设置在绘制文本时使用的当前文本基线
   *   textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
   *   // 字体样式
   *   fontStyle?: 'normal' | 'italic' | 'oblique';
   *   // 文本字体大小
   *   fontSize?: number;
   *   // 文本字体
   *   fontFamily?: string;
   *   // 文本粗细
   *   fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
   *   // 字体变体
   *   fontVariant?: 'normal' | 'small-caps' | string;
   *   // 文本行高
   *   lineHeight?: number;
   *   [key: string]: any;
   * }
   * ```
   *
   * @link https://github.com/antvis/g/blob/28e3178b616573e0fa6d59694f1aaca2baaa9766/packages/g-base/src/types.ts#L37|ShapeAttrs
   */
  style: ShapeAttrs;
}

/**
 * @title shape 关键点信息
 */
export interface ShapePoint {
  /**
   * @title 数据点映射后对应 x 的值。
   */
  readonly x: number | number[];
  /**
   * @title 数据点映射后对应 y 的值。
   */
  readonly y?: number | number[];
  /**
   * @title 数据在 y 方向的最小值。
   */
  readonly y0?: number;
  /**
   * @title 大小
   */
  size?: number;
}

/**
 * @title 小提琴图 shape 关键点信息
 */
export type ViolinShapePoint = ShapePoint & { _size?: number[] };

/**
 * @title 注册 ShapeFactory 需要实现的接口。
 */
export interface RegisterShapeFactory {
  /**
   * @title 默认的 shape 类型。
   */
  readonly defaultShapeType: string;
  /**
   * @title 返回绘制 shape 所有的关键点集合。
   */
  readonly getDefaultPoints?: (pointInfo: ShapePoint) => Point[];
  /**
   * @title 获取 shape 的默认绘制样式
   */
  readonly getDefaultStyle?: (geometryTheme: LooseObject) => LooseObject;
  /**
   * @title 获取 shape 对应的缩略图配置。
   */
  readonly getMarker?: (shapeType: string, markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /**
   * @title 创建具体的 G.Shape 实例。
   */
  readonly drawShape?: (shapeType: string, cfg: ShapeInfo, container: IGroup) => IShape | IGroup;
}

/**
 * @title 注册具体 shape 需要实现的接口。
 */
export interface RegisterShape {
  /**
   * @title 计算绘制需要的关键点，在注册具体的 shape 时由开发者自己定义。
   */
  readonly getPoints?: (pointInfo: ShapePoint) => Point[];
  /**
   * @title 获取 shape 对应的缩略图样式配置，在注册具体的 shape 时由开发者自己定义。
   */
  readonly getMarker?: (markerCfg: ShapeMarkerCfg) => ShapeMarkerAttrs;
  /**
   * @title 绘制函数。
   */
  readonly draw: (cfg: ShapeInfo, container: IGroup) => IShape | IGroup | void;
}

/**
 * @title Shape 接口定义。
 */
export interface Shape extends RegisterShape {
  /**
   * @title 坐标系对象。
   */
  coordinate: Coordinate;
  /**
   * @title 工具函数，将 0～1 path 转化成实际画布 path。
   */
  parsePath: (path: any) => PathCommand[];
  /**
   * @title 工具函数，0～1 的坐标点转换成实际画布坐标点。
   */
  parsePoint: (point: Point) => Point;
  /**
   * @title 工具函数，0～1 的坐标点集合转换成实际画布坐标点集合。
   */
  parsePoints: (points: Point[]) => Point[];
}

/**
 * @title ShapeFactory 接口定义。
 */
export interface ShapeFactory extends RegisterShapeFactory {
  /**
   * @title 工厂名。
   */
  geometryType: string;
  /**
   * @title 坐标系对象。
   */
  coordinate: Coordinate;
  /**
   * @title ShapeFactory 下所有的主题样式。
   */
  theme: LooseObject;
  /**
   * @title 根据名称获取具体的 shape 对象。
   */
  getShape: (shapeType: string | string[]) => Shape;
  /**
   * @title 获取构成 shape 的关键点。
   */
  getShapePoints: (shapeType: string | string[], pointInfo: ShapePoint) => Point[];
}

/**
 * @title 自定义 Shape marker 的函数
 */
export type ShapeMarkerSymbol = (x: number, y: number, r: number) => PathCommand[];

// ============================ Annotation 类型定义 ============================
/**
 * @title Annotation position 回调函数
 */
export type AnnotationPositionCallback = (
  xScales: Scale[] | Record<string, Scale>,
  yScales: Scale[] | Record<string, Scale>
) => [number | string, number | string];
/**
 * @title Annotation 位置相关属性的类型定义
 */
export type AnnotationPosition =
  | [number | string, number | string]
  | Record<string, number | string>
  | AnnotationPositionCallback;

/**
 * @title Annotation 定义的通用属性，chart.annotation().line({})
 */
export interface AnnotationBaseOption {
  /**
   * @title 类型
   */
  readonly type?: string;
  /**
   * @title 是否顶层
   * @description 指定 annotation 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
   */
  readonly top?: boolean;
  /**
   * @title 是否进行动画
   */
  readonly animate?: boolean;
  /**
   * @title 动画参数配置
   * @description 当且仅当 `animate` 属性为 true，即动画开启时生效。
   */
  readonly animateOption?: ComponentAnimateOption;
  /**
   * @title x 方向的偏移量
   */
  readonly offsetX?: number;
  /**
   * @title y 方向的偏移量
   */
  readonly offsetY?: number;
}

/**
 * @title 使用 RegionPosition 定位的组件配置
 */
export interface RegionPositionBaseOption extends AnnotationBaseOption {
  /**
   * @title 起始位置
   */
  readonly start: AnnotationPosition;
  /**
   * @title 结束位置
   */
  readonly end: AnnotationPosition;
  /**
   * @title 图形样式属性
   */
  readonly style?: ShapeAttrs;
}

/**
 * @title 使用 PointPosition 定位的组件配置
 */
export interface PointPositionBaseOption extends AnnotationBaseOption {
  /**
   * @title Point 定位位置
   */
  readonly position: AnnotationPosition;
}

/**
 * @title 使用 Image Annotation 组件的配置定义
 */
export interface ImageOption extends RegionPositionBaseOption {
  /**
   * @title 图片路径
   */
  readonly src: string;
}

/**
 * @title 使用 Line Annotation 组件的配置定义
 */
export interface LineOption extends RegionPositionBaseOption {
  /**
   * @title 文本配置定义
   */
  readonly text?: LineAnnotationTextCfg;
}
/**
 * @title 使用 Arc Annotation 组件的配置定义
 */
export type ArcOption = RegionPositionBaseOption;
/**
 * @title 使用 Region Annotation 组件的配置定义
 */
export type RegionOption = RegionPositionBaseOption;
/**
 * @title 使用 Text Annotation 组件的配置定义
 */
export interface TextOption extends PointPositionBaseOption, Omit<EnhancedTextCfg, 'content'> {
  content?: string | number | ((filteredData: object[]) => string | number);
}
/**
 * @title 使用 DataMarker Annotation 组件的配置定义
 */
export interface DataMarkerOption extends PointPositionBaseOption {
  /**
   * @title point 设置
   */
  readonly point?: null | { style?: ShapeAttrs };
  /**
   * @title line 设置
   */
  readonly line?: null | { style?: ShapeAttrs; length?: number };
  /**
   * @title text 设置
   */
  readonly text: null | EnhancedTextCfg;
  /**
   * @title 文本超出绘制区域时，是否自动调节文本方向，默认为 true
   */
  readonly autoAdjust?: boolean;
  /**
   * @title 朝向，默认为 upward，可选值为 'upward' 或者 'downward'
   */
  readonly direction?: 'upward' | 'downward';
}
/**
 * @title 使用 DataRegion Annotation 组件的配置定义
 */
export interface DataRegionOption extends RegionPositionBaseOption {
  /**
   * @title line长度，default为 0
   */
  readonly lineLength?: number;
  /**
   * @title 标注区间的配置
   */
  readonly region?: null | { style?: ShapeAttrs };
  /**
   * @title 文本的配置
   */
  readonly text?: null | EnhancedTextCfg;
}
/**
 * @title 使用 RegionFilter Annotation 组件的配置定义
 */
export interface RegionFilterOption extends RegionPositionBaseOption {
  /**
   * @title 染色色值
   */
  readonly color: string;
  /**
   * @title 适用场景
   * @description 可选,设定regionFilter只对特定geom类型起作用，如apply:['area']
   */
  readonly apply?: string[];
}

/**
 * @title Shape Annotation 的配置
 */
export interface ShapeAnnotationOption extends AnnotationBaseOption {
  /**
   * @title 自定义 Annotation 绘制函数
   */
  render: (
    container: IGroup,
    view: View,
    helpers: { parsePosition: (position: [string | number, string | number] | Datum) => Point }
  ) => void;
}

/**
 * Html Annotation 配置
 */
export interface HtmlAnnotationOption extends PointPositionBaseOption {
  /**
   * @title 容器元素
   */
  container?: string | HTMLElement;
  /**
   * @title 自定义 HTML DOM 元素
   */
  html: string | HTMLElement | ((container: HTMLElement, view: View) => void | string | HTMLElement);
  /**
   * @title X 方向对齐
   */
  alignX?: 'left' | 'middle' | 'right';
  /**
   * @title Y 方向对齐
   */
  alignY?: 'top' | 'middle' | 'bottom';
  /**
   * @title X 方向偏移
   */
  offsetX?: number;
  /**
   * @title Y 方向偏移
   */
  offsetY?: number;
}

// ============================ Chart && View 上的类型定义 ============================
/**
 * @title Tooltip 内容框的 css 样式定义
 */
export interface TooltipDomStyles {
  'g2-tooltip'?: LooseObject;
  'g2-tooltip-title'?: LooseObject;
  'g2-tooltip-list'?: LooseObject;
  'g2-tooltip-list-item'?: LooseObject;
  'g2-tooltip-marker'?: LooseObject;
  'g2-tooltip-value'?: LooseObject;
  'g2-tooltip-name'?: LooseObject;
}

/**
 * @title 目前组件动画允许的参数配置
 */
export interface ComponentAnimateCfg {
  /**
   * @title 动画执行时间
   */
  readonly duration?: number;
  /**
   * @title 动画缓动函数
   */
  readonly easing?: string;
  /**
   * @title 动画延迟时间
   */
  readonly delay?: number;
}
/**
 * @title 组件各个动画类型配置
 */
export interface ComponentAnimateOption {
  /**
   * @title 初入场动画配置
   */
  appear?: ComponentAnimateCfg;
  /**
   * @title 更新动画配置
   */
  update?: ComponentAnimateCfg;
  /**
   * @title 更新后新入场的动画配置
   */
  enter?: ComponentAnimateCfg;
  /**
   * @title 离场动画配置
   */
  leave?: ComponentAnimateCfg;
}

/**
 * @title 列定义配置项
 */
export interface ScaleOption extends ScaleConfig {
  /**
   * @title 声明度量类型。
   */
  type?: ScaleType;
  /**
   * @title 同步 scale
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
   * @title 是否显示最后的 tick
   * @description 只对 `type: 'cat'` 以及 `type: 'time-cat'` 的 scale 生效，强制显示最后的日期 tick。
   */
  showLast?: boolean;
  /**
   * @title 唯一 ID
   * @description
   * 用于声明使用数据记录中的哪些字段来组成一条数据的唯一 id（如有多个字段，则使用 '-' 连接）。
   * 数据 id 用于标识 Element 图形元素，应用于 Geometry 中的图形元素 Element 更新。
   * 默认 G2 内部会有一套 ID 生成规则，如果不能满足用户需求，用户既可以使用该属性配置 id。
   * @example
   * 下面的例子中，声明了将 'x' 和 'y' 字段的数值来作为每条数据记录的 id，即下面数据两条数据的 id 分别为：'1-23' 和 '2-2'。
   * ```ts
   * const data = [
   *   { x: 1, y: 23, z: 'a' },
   *   { x: 2, y: 2, z: 'b' },
   * ];
   *
   * chart.scale({
   *   x: { key: true },
   *   y: { key: true },
   * });
   * ```
   */
  key?: boolean;
}

/**
 * @title Geometry 动画参数配置。geometry.animate()
 */
export interface AnimateOption {
  /**
   * @title chart 初始化渲染时的入场动画，false/null 表示关闭入场动画。
   */
  appear?: AnimateCfg | false | null;
  /**
   * @title chart 发生更新时，新增元素的入场动画，false/null 表示关闭入场动画。
   */
  enter?: AnimateCfg | false | null;
  /**
   * @title 更新动画配置，false/null 表示关闭更新动画。
   */
  update?: AnimateCfg | false | null;
  /**
   * @title 销毁动画配置，false/null 表示关闭销毁动画。
   */
  leave?: AnimateCfg | false | null;
}

/**
 * @title 用于配置项式声明交互行为
 */
export interface InteractionOption {
  /**
   * @title 交互名称
   */
  type: string;
  /**
   * @title 交互配置
   */
  cfg?: LooseObject;
}

/**
 * @title 用于配置项式的 Geometry 创建方式
 */
export interface GeometryOption {
  /**
   * @title Geometry 的类型。
   */
  type?: 'interval' | 'line' | 'path' | 'point' | 'area' | 'polygon' | 'schema' | 'edge' | 'heatmap' | string;
  /**
   * @title position 通道映射规则，对应 `geometry.position()`。
   */
  position?: string | AttributeOption;
  /**
   * @title color 通道映射规则，对应 `geometry.color()`。
   */
  color?: string | AttributeOption;
  /**
   * @title shape 通道映射规则，对应 `geometry.shape()`。
   */
  shape?: string | AttributeOption;
  /**
   * @title size 通道映射规则，对应 `geometry.size()`。
   */
  size?: number | string | AttributeOption;
  /**
   * @title adjust 数据调整方式，对应 `geometry.adjust()`。
   */
  adjust?: string | string[] | AdjustOption | AdjustOption[];
  /**
   * @title style 样式配置，对应 `geometry.size()`。
   */
  style?: StyleOption | LooseObject;
  /**
   * @title tooltip 配置，对应 `geometry.tooltip()`。
   */
  tooltip?: GeometryTooltipOption | boolean | string;
  /**
   * @title Geometry 动画配置，对应 `geometry.animate()`。
   */
  animate?: AnimateOption | boolean;
  /**
   * @title Label 配置，对应 `geometry.label()`。
   */
  label?: LabelOption | false | string;
  /**
   * @title state 样式配置，对应 `geometry.state()`。
   */
  state?: StateOption;
  /**
   * @title 其他配置
   */
  cfg?: {
    /**
     * @title 是否对数据进行排序
     */
    sortable?: boolean;
    /**
     * @title 是否可见
     */
    visible?: boolean;
    /**
     * @title 是否连接空值，仅对 'line', 'area' 和 'path' 生效
     */
    connectNulls?: boolean;
  };
}

/**
 * @title 用于配置型式的 View 声明方式
 */
export interface ViewOption {
  /**
   * @title view 的唯一表示 ID
   */
  readonly id?: string;
  /**
   * @title view 的绘制范围，起始点为左上角。
   */
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
  /**
   * @title 设置主题。
   */
  readonly theme?: LooseObject | string;
  /**
   * @title 是否可见。
   */
  readonly visible?: boolean;
  /**
   * 图表组件、图形映射等相关的配置。
   */
  readonly options?: Options;
}

/**
 * @title Chart 构造方法的入参
 */
export interface ChartCfg
  extends Omit<ViewCfg, 'parent' | 'canvas' | 'foregroundGroup' | 'middleGroup' | 'backgroundGroup' | 'region'> {
  /**
   * @title 指定 chart 绘制的 DOM，可以传入 DOM id，也可以直接传入 dom 实例。
   */
  readonly container: string | HTMLElement;
  /**
   * @title 图表宽度。
   */
  readonly width?: number;
  /**
   * @title 图表高度。
   */
  readonly height?: number;
  /**
   * @title 否自适应容器宽高
   * @description
   * 图表是否自适应容器宽高，默认为 false，用户需要手动设置 width 和 height。当 `autoFit: true` 时，
   * 会自动取图表容器的宽高，如果用户设置了 height，那么会以用户设置的 height 为准。
   * @default false
   */
  readonly autoFit?: boolean;
  /**
   * @title 渲染引擎
   * @default "canvas"
   */
  readonly renderer?: Renderer;
  /**
   * @title 像素比
   * @description 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。
   */
  readonly pixelRatio?: number;
  /**
   * @title 是否开启局部刷新
   * @default true
   */
  readonly localRefresh?: boolean;
  /**
   * @title 是否支持 CSS transform
   * @description 开启后图表的交互以及事件将在页面设置了 css transform 属性时生效，默认关闭。
   * @default false
   */
  readonly supportCSSTransform?: boolean;
  /**
   * @title 配置图表默认交互，仅支持字符串形式。
   */
  readonly defaultInteractions?: string[];
}

export type SyncViewPaddingFn = (chart: View, views: View[], PC: PaddingCalCtor) => void;

/**
 * @title View 构造参数
 */
export interface ViewCfg {
  /**
   * @title View id，可以由外部传入
   */
  readonly id?: string;
  /**
   * @title 当前 view 的父级 view。
   */
  readonly parent: View;
  /**
   * @title canvas 实例。
   */
  readonly canvas: ICanvas;
  /**
   * @title 前景层
   */
  readonly foregroundGroup: IGroup;
  /**
   * @title 中间层
   */
  readonly middleGroup: IGroup;
  /**
   * @title 背景层
   */
  readonly backgroundGroup: IGroup;
  /**
   * @title view 的绘制范围
   */
  readonly region?: Region;
  /**
   * @title 是否对超出坐标系范围的 Geometry 进行剪切
   */
  readonly limitInPlot?: boolean;
  /**
   * @title 内边距
   * @description 设置图表的内边距，使用方式参考 CSS 盒模型，下图黄色区域即为 padding 的范围。
   * @see ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: ViewPadding;
  /**
   * @title 额外边距
   * @description 设置图表的内边距在padding的基础上增加appendPadding的调整。
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly appendPadding?: ViewAppendPadding;
  /**
   * @title 是否同步子 view 的 padding
   * @description 是否同步子 view 的 padding，可以是 boolean / SyncViewPaddingFn
   * @example
   *  view1 的 padding 10
   *  view2 的 padding 20
   *  那么两个子 view 的 padding 统一变成最大的 20.
   *
   * 如果是 Funcion，则使用自定义的方式去计算子 view 的 padding，这个函数中去修改所有的 views autoPadding 值
   */
  readonly syncViewPadding?: boolean | SyncViewPaddingFn;
  /**
   * @title 主题
   * @description 设置 view 实例主题
   */
  readonly theme?: LooseObject | string;
  /**
   * @title 图表组件、图形映射等相关的配置。
   */
  readonly options?: Options;
  /**
   * @title 是否可见
   */
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

/**
 * @title Legend marker 的配置结构
 */
export interface MarkerCfg extends LegendMarkerCfg {
  /**
   * @title 配置图例 marker 的 symbol 形状。
   */
  symbol?: Marker | MarkerCallback;
  style?: ShapeAttrs | ((style: ShapeAttrs) => ShapeAttrs);
}

/**
 * @title Legend item 各个图例项的数据结构
 */
export interface LegendItem {
  /**
   * 唯一值，用于动画或者查找
   */
  id?: string;
  /**
   * @title 名称
   */
  name: string;
  /**
   * @title 值
   */
  value: any;
  /**
   * @title 图形标记
   */
  marker?: MarkerCfg | ((name: string, index: number, item: { name: string; value: string } & MarkerCfg) => MarkerCfg);
  /**
   * @title 初始是否处于未激活状态
   */
  unchecked?: boolean;
}

export interface G2LegendTitleCfg extends LegendTitleCfg {
  /**
   * @title title 文本显示内容
   */
  text?: string;
}

/**
 * 图例项配置
 */
export interface LegendCfg extends Omit<CategoryLegendCfg, 'marker'> {
  /**
   * @title 是否为自定义图例
   * @description 当该属性为 true 时，需要声明 items 属性。
   */
  readonly custom?: boolean;
  /**
   * @title 布局
   * @description 布局方式： horizontal，vertical
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * @title 图例标题配置
   * @description 默认不展示。
   * @example
   * 属性结构如下：
   *
   * ```ts
   * {
   *   spacing?: number;    // 标题同图例项的间距
   *   style?: ShapeAttrs;  // 文本样式配置项
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L639|LegendTitleCfg
   */
  title?: G2LegendTitleCfg;
  /**
   * @title 背景框配置项。
   * @example
   * 属性结构如下：
   *
   * ```ts
   * {
   *   padding?: number | number[]; // 背景的留白
   *   style?: ShapeAttrs;          // 背景样式配置项
   * }
   * ```
   *
   * 详见 {@link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L652|LegendBackgroundCfg}
   */
  background?: LegendBackgroundCfg;
  /**
   * @title 图例的位置。
   */
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
  /**
   * @title 动画开关，默认关闭。
   */
  animate?: boolean;
  /**
   * @title 动画
   * @description 动画参数配置，当且仅当 `animate` 属性为 true，即动画开启时生效。
   */
  animateOption?: ComponentAnimateOption;
  /**
   * @title 水平间距
   * @description **分类图例适用**，控制图例项水平方向的间距。
   */
  itemSpacing?: number;
  /**
   * @title 垂直间距
   * @description **分类图例适用**，控制图例项垂直方向的间距。
   */
  itemMarginBottom?: number;
  /**
   * @title 图例项的最大宽度
   * @description
   * **分类图例适用**，图例项的最大宽度，超出则自动缩略。
   * `maxItemWidth` 可以是像素值；
   * 也可以是相对值（取 0 到 1 范围的数值），代表占图表宽度的多少
   */
  maxItemWidth?: number;
  /**
   * @title 图例项的宽度
   * @description **分类图例适用**，图例项的宽度, 默认为 null，自动计算。
   */
  itemWidth?: number;
  /**
   * @title 图例项的高度
   * @description **分类图例适用**，图例的高度，默认为 null。
   */
  itemHeight?: number;
  /**
   * @title 图例项 name
   * @description
   * **分类图例适用**，图例项 name 文本的配置。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   spacing?: number; // 图例项 name 同后面 value 的间距
   *   formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
   *   style?: ShapeAttrs; // 文本配置项
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L665|LegendItemNameCfg
   */
  itemName?: LegendItemNameCfg;
  /**
   * @title 图例项 value
   * @description
   * **分类图例适用**，图例项 value 附加值的配置项。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   alignRight?: boolean; // 是否右对齐，默认为 false，仅当设置图例项宽度时生效
   *   formatter?: (text: string, item: ListItem, index: number) => any; // 格式化文本函数
   *   style?: ShapeAttrs; // 图例项附加值的配置
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L685|LegendItemValueCfg
   */
  itemValue?: LegendItemValueCfg;
  /**
   * @title 最大宽度
   * @description **分类图例适用**，图例项最大宽度设置。
   */
  maxWidth?: number;
  /**
   * @title 最大高度
   * @description **分类图例适用**，图例项最大高度设置。
   */
  maxHeight?: number;
  /**
   * @title 最大宽度比例
   * @description **分类图例适用**，图例项最大宽度比例（以 view 的 bbox 宽度为参照，默认 0.25）。
   */
  maxWidthRatio?: number;
  /**
   * @title 最大高度比例
   * @description **分类图例适用**，图例项最大高度比例（以 view 的 bbox 高度为参照，默认 0.25）。
   */
  maxHeightRatio?: number;
  /**
   * @title 图例项的 marker
   * @description **分类图例适用**，图例项的 marker 图标的配置。
   */
  marker?: MarkerCfg | ((name: string, index: number, item: { name: string; value: string } & MarkerCfg) => MarkerCfg);
  /**
   * @title 是否进行分页
   * @description **适用于分类图例**，当图例项过多时是否进行分页。
   */
  flipPage?: boolean;
  /**
   * @title 分页器的样式
   * @description **适用于分类图例**，图例分页器的样式设置。
   */
  pageNavigator?: LegendPageNavigatorCfg;
  /**
   * @title 图例项
   * @description **分类图例适用**，用户自己配置图例项的内容。
   */
  items?: LegendItem[];
  /**
   * @title 反选
   * @description **分类图里适用**，用来配置正反选功能
   */
  radio?: LegendRadio;
  /**
   * @title 是否逆序
   * @description **分类图例适用**，是否将图例项逆序展示。
   */
  reversed?: boolean;

  /**
   * @title 最小值
   * @description **连续图例适用**，选择范围的最小值。
   */
  min?: number;
  /**
   * @title 最大
   * @description **连续图例适用**，选择范围的最大值。
   */
  max?: number;
  /**
   * @title value
   * @description **连续图例适用**，选择的值。
   */
  value?: number[];
  /**
   * @title 色块样式
   * @description
   * **连续图例适用**，选择范围的色块样式配置项。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 选定范围的样式
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L574|ContinueLegendTrackCfg
   */
  track?: ContinueLegendTrackCfg;
  /**
   * @title 滑轨（背景
   * @description
   * **连续图例适用**，图例滑轨（背景）的样式配置项。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   type?: string; // rail 的类型，color, size
   *   size?: number; // 滑轨的宽度
   *   defaultLength?: number; // 滑轨的默认长度，，当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度
   *   style?: ShapeAttrs; // 滑轨的样式
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L595|ContinueLegendRailCfg
   */
  rail?: ContinueLegendRailCfg;
  /**
   * @title 文本
   * @description
   * **连续图例适用**，文本的配置项。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   // 文本同滑轨的对齐方式，有五种类型
   *   // rail ： 同滑轨对齐，在滑轨的两端
   *   // top, bottom: 图例水平布局时有效
   *   // left, right: 图例垂直布局时有效
   *   align?: string;
   *   spacing?: number; // 文本同滑轨的距离
   *   style?: ShapeAttrs; // 文本样式
   * }
   * ```
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L618|ContinueLegendLabelCfg
   */
  label?: ContinueLegendLabelCfg;
  /**
   * @title 滑块
   * @description
   * **连续图例适用**，滑块的配置项。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   size?: number; // 滑块的大小
   *   style?: ShapeAttrs; // 滑块的样式设置
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L582|ContinueLegendTrackCfg
   */
  handler?: ContinueLegendHandlerCfg;
  /**
   * @title 是否可滑动
   * @description **连续图例适用**，滑块是否可以滑动。
   */
  slidable?: boolean;
  /**
   * @title 图例 x 方向的偏移。
   */
  offsetX?: number;
  /**
   * @title 图例 y 方向的偏移。
   */
  offsetY?: number;
  /**
   * @title 图例在四个方向的偏移量
   */
  padding?: number[];
  /**
   * 图例高亮状态，false 表示默认置灰，无或 true 表示高亮
   */
  selected?: {
    [key: string]: boolean;
  };
}

/**
 * Tooltip Crosshairs 的文本数据结构。
 */
export interface TooltipCrosshairsText extends CrosshairTextCfg {
  /**
   * @title crosshairs 文本内容
   */
  content?: string;
}

/**
 * 辅助线文本回调函数
 * @param type 对应当前 crosshairs 的类型，值为 'x' 或者 'y'
 * @param defaultContent 对应当前 crosshairs 默认的文本内容
 * @param items 对应当前 tooltip 内容框中的数据
 * @param currentPoint 对应当前坐标点
 * @returns 返回当前 crosshairs 对应的辅助线文本配置
 */
export type TooltipCrosshairsTextCallback = (
  type: string,
  defaultContent: any,
  items: any[],
  currentPoint: Point
) => TooltipCrosshairsText;
/**
 * @title Tooltip crosshairs 配置结构
 */
export interface TooltipCrosshairs {
  /**
   * @title 类型
   * @description
   * crosshairs 的类型: `x` 表示 x 轴上的辅助线，`y` 表示 y 轴上的辅助项。
   * 以下是在不同坐标系下，crosshairs 各个类型的表现：
   *
   * | 坐标系 | type = 'x' | type = 'xy' | type = 'y' |
   * | ------------ | ------------- | ------------- |
   * | 直角坐标系  | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*jmUBQ4nbtXsAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*RpWXT76ZSQgAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*Xjl8TLIJLuUAAAAAAAAAAABkARQnAQ) |
   * | 极坐标 | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*zbMVSoKTyFsAAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*k5EYRJspET0AAAAAAAAAAABkARQnAQ) | ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*n_TKQpUaXWEAAAAAAAAAAABkARQnAQ) |
   */
  type?: 'x' | 'y' | 'xy';
  /**
   * @title 辅助线的样式配置。
   * @description
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 线的样式配置
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L1177|CrosshairLineCfg
   */
  line?: CrosshairLineCfg;
  /**
   * @title 文本
   * @description 辅助线文本配置，支持回调。
   */
  text?: TooltipCrosshairsText | TooltipCrosshairsTextCallback;
  /**
   * @title 辅助线文本背景配置。
   * @description
   * 属性结构如下：
   *
   * ```ts
   * {
   *   padding?: number | number[]; // 文本背景周围的留白
   *   style?: ShapeAttrs; // 文本背景的样式
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L1185|CrosshairTextBackgroundCfg
   */
  textBackground?: CrosshairTextBackgroundCfg;
  /**
   * @title 辅助线是否跟随鼠标移动
   * @description 即定位到数据点
   * @default false
   */
  follow?: boolean;
}

export type TooltipTitle = string | ((title: string, datum: Datum) => string);

export type TooltipItem = {
  /**
   * @title 原始数据
   */
  readonly data: Datum; // 原始数据
  /**
   * @title 映射之后的数据
   */
  readonly mappingData: Datum; // 映射后的数据
  /**
   * @title tooltip item 中名称
   */
  readonly name: string;
  /**
   * @title tooltip item 中值
   */
  readonly value: string | number;
  /**
   * @title tooltip item 中颜色
   */
  readonly color: string;
  /**
   * @title tooltip item 中图标类型
   */
  readonly marker: string;
};

/**
 * @title chart.tooltip() 接口配置属性
 */
export interface TooltipCfg {
  /**
   * @title 设置 tooltip 内容框是否跟随鼠标移动。
   * @description 默认为 true，跟随鼠标移动，false 则固定位置不随鼠标移动。
   * @default true
   */
  follow?: boolean;
  /**
   * @title tooltip 是否允许鼠标滑入
   * @default false
   */
  enterable?: boolean;
  /**
   * @title tooltip 显示延迟（ms）
   * @description 默认为 16ms，建议在 enterable = true 的时候才设置
   * @default "16ms"
   */
  showDelay?: number;
  /**
   * @title 是否展示 tooltip 标题。
   */
  showTitle?: boolean;
  /**
   * @title 标题
   * @description
   * 设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。
   * 同时支持传入方法，回调的方式返回字符串
   */
  title?: TooltipTitle;
  /**
   * @title 设置 tooltip 的固定展示位置，相对于数据点。
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * @title 是否合并当前点对应的所有数据
   * @description true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。
   */
  shared?: boolean; // 是否只展示单条数据
  /**
   * @title 是否展示 crosshairs。
   */
  showCrosshairs?: boolean;
  /**
   * @title 交叉线
   * @description 配置 tooltip 的 crosshairs，当且仅当 `showCrosshairs` 为 true 时生效。
   */
  crosshairs?: TooltipCrosshairs;
  /**
   * @title 是否渲染 tooltipMarkers。
   */
  showMarkers?: boolean;
  /**
   * @title tooltipMarker 的样式配置。
   */
  marker?: object;
  /**
   * @title 是否展示 tooltip 内容框
   */
  showContent?: boolean | ((datum: Datum) => boolean);
  /**
   * @title 自定义 tooltip 的容器。
   */
  container?: string | HTMLElement;
  /**
   * @title 图例容器的模板
   * @description 用于指定图例容器的模板，自定义模板时必须包含各个 dom 节点的 class。
   */
  containerTpl?: string;
  /**
   * @title 默认模板
   * @description 每项记录的默认模板，自定义模板时必须包含各个 dom 节点的 class。
   */
  itemTpl?: string;
  /**
   * @title dom 样式
   * @description 传入各个 dom 的样式。
   */
  domStyles?: TooltipDomStyles;
  /**
   * @title tooltip 偏移量。
   */
  offset?: number;
  /**
   * @title 是否将 tooltip items 逆序
   */
  reversed?: boolean;
  /**
   * @title 是否显示空值的 tooltip 项目
   */
  showNil?: boolean;
  /**
   * @description 在 tooltip 渲染之前，对最终的 items 进行自定义处理（比如排序、过滤、格式化等）
   */
  customItems?: (originalItems: TooltipItem[]) => TooltipItem[];
  /**
   * @title 自定义模板
   */
  customContent?: (title: string, data: any[]) => string | HTMLElement;
}

/**
 * @title 坐标系配置
 */
export interface CoordinateOption {
  /**
   * @title 坐标系类型
   */
  type?: 'polar' | 'theta' | 'rect' | 'cartesian' | 'helix';
  /**
   * @title 坐标系配置项，目前常用于极坐标。
   */
  cfg?: CoordinateCfg;
  /**
   * @title 坐标系变换
   * @description
   * 1. rotate 表示旋转，使用弧度制。
   * 2. scale 表示沿着 x 和 y 方向的缩放比率。
   * 3. reflect 表示沿 x 方向镜像或者沿 y 轴方向映射。
   * 4. transpose 表示 x，y 轴置换。
   */
  actions?: CoordinateActions[];
}

/**
 * @title 极坐标系支持的配置属性
 */
export interface CoordinateCfg {
  /**
   * @title 起始弧度
   * @description 用于极坐标，配置起始弧度。
   */
  startAngle?: number;
  /**
   * @title 结束弧度
   * @description 用于极坐标，配置结束弧度。
   */
  endAngle?: number;
  /**
   * @title 半径
   * @description 用于极坐标，配置极坐标半径，0 - 1 范围的数值。
   */
  radius?: number;
  /**
   * @title 内半径
   * @description 用于极坐标，极坐标内半径，0 -1 范围的数值。
   */
  innerRadius?: number;
}

/**
 * @title 坐标轴网格线的配置属性
 */
export interface AxisGridCfg {
  /**
   * @title 线的样式
   * @description
   * 属性结构如下：
   *
   * ```ts
   * {
   *   type?: string; // 栅格线的类型，'line' 或者 'circle'
   *   style?: ShapeAttrs; // 栅格线的样式配置项
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L407|GridLineCfg
   */
  line?: GridLineCfg;
  /**
   * @title 两个栅格线间的填充色。
   */
  alternateColor?: string | string[];
  /**
   * @title 是否关闭
   * @description 对于 circle 是否关闭 grid。
   */
  closed?: boolean;
  /**
   * @title 是否同刻度线对齐
   * @description 如果值为 false，则会显示在两个刻度中间。
   * @see ![image](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*YX6fS4GTTvMAAAAAAAAAAABkARQnAQ)
   */
  alignTick?: boolean;
}

/**
 * @title 坐标轴配置属性，chart.axis()
 */
export interface AxisCfg {
  /**
   * @title 是否渲染在画布顶层
   * @description 防止部分图形中，需要将 axis 显示在图形上面，避免被图形遮挡
   */
  top?: boolean;
  /**
   * @title 坐标轴的位置
   * @description 适用于直角坐标系，设置坐标轴的位置。
   */
  position?: 'top' | 'bottom' | 'right' | 'left';
  /**
   * @title 轴线
   * @description
   * 坐标轴线的配置项，null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴线的样式配置项
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L91|AxisLineCfg
   */
  line?: AxisLineCfg | null;
  /**
   * @title 刻度线线
   * @description
   * 坐标轴刻度线线的配置项，null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴刻度线的样式配置项
   *   alignTick?: boolean; // 是否同 tick 对齐
   *   length?: number;  // 长度
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L103|AxisTickLineCfg
   */
  tickLine?: AxisTickLineCfg | null;
  /**
   * @title 子刻度线
   * @description
   * 坐标轴子刻度线的配置项，null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   style?: ShapeAttrs; // 坐标轴刻度线的样式配置项
   *   count?: number; // 子刻度个数
   *   length?: number; // 子刻度线长度
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L169|AxisSubTickLineCfg
   */
  subTickLine?: AxisSubTickLineCfg | null;
  /**
   * @title 标题
   * @description
   * 标题的配置项，null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   offset?: number; // 标题距离坐标轴的距离
   *   style?: ShapeAttrs; // 标题文本配置项
   *   autoRotate?: boolean; // 是否自动旋转
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L191|AxisTitleCfg
   */
  title?: AxisTitleCfg | null;
  /**
   * @title 文本标签
   * @description
   * 文本标签的配置项，null 表示不展示。
   * 属性结构如下：
   *
   * ```ts
   * {
   *   // 坐标轴文本的样式
   *   style?: ShapeAttrs;
   *   // label 的偏移量
   *   offset?: number;
   *   // 文本旋转角度
   *   rotate?: number;
   *   // 格式化函数
   *   formatter?: (text: string, item: ListItem, index: number) => any;
   *   // 是否自动旋转，默认 false
   *   autoRotate?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   *   // 是否自动隐藏，默认 true
   *   autoHide?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   *   // 是否自动省略，默认 false
   *   autoEllipsis?: boolean | (isVertical: boolean, labelGroup: IGroup, limitLength?: number) => boolean; | string;
   * }
   * ```
   *
   * @link https://github.com/antvis/component/blob/81890719a431b3f9088e0c31c4d5d382ef0089df/src/types.ts#L127|AxisLabelCfg
   */
  label?: AxisLabelCfg | null;
  /**
   * @title 网格线
   * @description 坐标轴网格线的配置项，null 表示不展示。
   */
  grid?: AxisGridCfg | null;
  /**
   * @title 动画
   * @default true
   */
  animate?: boolean;
  /**
   * @title 动画参数
   */
  animateOption?: ComponentAnimateOption;
  /**
   * @title 坐标轴 label 的方向
   * @description 标记坐标轴 label 的方向，左侧为 1，右侧为 -1。
   */
  verticalFactor?: number;
  /**
   * @title 坐标轴垂直方向的最大限制长度
   * @description
   * 配置坐标轴垂直方向的最大限制长度，对文本自适应有很大影响。
   * 1. 可以直接设置像素值，如 100；
   * 2. 也可设置绝对值，如 0.2，如果是 x 轴，则相对于图表的高度，如果是 y 轴，则相对于图表的宽度
   *
   * 在 G2 中，x 轴的文本默认最大高度为图表高度的 1/2，y 轴的文本默认最大长度为图表宽度的 1/3
   */
  verticalLimitLength?: number;
}

export interface SliderCfg {
  /**
   * @title slider 高度
   */
  readonly height?: number;

  /**
   * @title 滑块背景区域配置
   */
  readonly trendCfg?: Omit<TrendCfg, 'data'> & { data?: number[] };
  /**
   * @title 滑块背景样式
   */
  readonly backgroundStyle?: any;
  /**
   * @title 滑块前景样式
   */
  readonly foregroundStyle?: any;
  /**
   * @title 滑块两个操作块样式
   */
  readonly handlerStyle?: any;
  /**
   * @title 文本样式
   */
  readonly textStyle?: any;
  /**
   * @title 允许滑动位置的最小值
   */
  readonly minLimit?: number;
  /**
   * @title 允许滑动位置的最大值
   */
  readonly maxLimit?: number;
  /**
   * @title 滑块初始化的起始位置
   */
  readonly start?: number;
  /**
   * @title 滑块初始化的结束位置
   */
  readonly end?: number;
  /**
   * @title 布局的 padding
   */
  readonly padding?: number[];
  /**
   * @title 滑块文本格式化函数
   */
  formatter?: (val: any, datum: Datum, idx: number) => any;
}

/**
 * 事件 payload
 */
export type EventPayload = LooseObject & {
  /**
   * @title 触发事件的来源
   */
  source?: string;
};

export type EventCallback = (event: LooseObject) => void;
/**
 * todo: 事件名可穷举，后续需要补充
 * 事件配置项
 */
export interface EventCfg {
  [key: string]: EventCallback;
}

/**
 * 缩略轴的配置项
 */
export type SliderOption = SliderCfg | boolean;

/**
 * @title 滚动条组件配置项
 */
export interface ScrollbarCfg {
  /**
   * @title 滚动条类型，默认 horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * @title 宽度，在 vertical 下生效
   */
  width?: number;
  /**
   * @title 高度，在 horizontal 下生效
   */
  height?: number;
  /**
   * @title 可选 padding
   */
  padding?: Padding;
  /**
   * @title 对应水平滚动条，为 X 轴每个分类字段的宽度；对于垂直滚动条，为 X 轴每个分类字段的高度
   */
  categorySize?: number;
  /**
   * @title 滚动的时候是否开启动画，默认跟随 view 中 animate 配置
   */
  animate?: boolean;
  /**
   * @title 主题样式设置, 暂不提供 hover 高亮滑块样式配置
   */
  style?: {
    /**
     * @title 滑道颜色
     */
    trackColor?: string;
    /**
     * @title 滑块颜色
     */
    thumbColor?: string;
    /**
     * @title 滑块高亮样式，对应主题的 hover.style.thumbColor
     */
    thumbHighlightColor?: string;
    /**
     * @title 是否圆角
     */
    lineCap?: string;
  };
}

/**
 * @title 滚动条配置
 */
export type ScrollbarOption = ScrollbarCfg | boolean;

/**
 * @title 配置项声明式
 */
export interface Options {
  /**
   * @title 数据源配置。
   */
  readonly data?: Data;
  /**
   * @title 设置数据过滤条件，以 data 中的数据属性为 key。
   */
  readonly filters?: Record<string, FilterCondition>;
  /**
   * @title 坐标轴配置，以 data 中的数据属性为 key。
   */
  readonly axes?: Record<string, AxisOption> | boolean;
  /**
   * @title 图例配置，以 data 中的数据属性为 key。
   */
  readonly legends?: AllLegendsOptions;
  /**
   * @title 列定义配置，用于配置数值的类型等，以 data 中的数据属性为 key。
   */
  readonly scales?: Record<string, ScaleOption>;
  /**
   * @title Tooltip 配置。
   */
  readonly tooltip?: TooltipOption;
  /**
   * @title 坐标系配置。
   */
  readonly coordinate?: CoordinateOption;
  /**
   * @title 静态辅助元素声明。
   */
  readonly annotations?: (
    | ArcOption
    | RegionFilterOption
    | ImageOption
    | LineOption
    | TextOption
    | RegionOption
    | DataMarkerOption
    | DataRegionOption
  )[];
  /**
   * @title Geometry 配置
   */
  readonly geometries?: GeometryOption[];
  /**
   * @title 开启/关闭动画，默认开启
   */
  readonly animate?: boolean;
  /**
   * @title 配置需要使用的交互行为
   */
  readonly interactions?: InteractionOption[];
  /**
   * @title 事件配置
   */
  readonly events?: EventCfg;

  /**
   * @title 缩略轴的配置
   */
  readonly slider?: SliderOption;

  /**
   * @title 滚动条配置
   */
  readonly scrollbar?: ScrollbarOption;

  /**
   * @title 子 View
   */
  readonly views?: ViewOption[];

  /**
   * @title 分面
   */
  readonly facets?: (RectCfg | MirrorCfg | CircleCfg | ListCfg | TreeCfg)[];

  /**
   * @title 其他自定义的 option
   */
  readonly [name: string]: any;
}

/**
 * @title 支持的 Marker 类型
 */
export type Marker =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'triangle-down'
  | 'hexagon'
  | 'bowtie'
  | 'cross'
  | 'tick'
  | 'plus'
  | 'hyphen'
  | 'line';
/**
 * @title 自定义 Marker 的回调函数定义
 */
export type MarkerCallback = (x: number, y: number, r: number) => PathCommand[];
/**
 * @title chart.tooltip() 参数类型
 */
export type TooltipOption = TooltipCfg | boolean;
/* 筛选器函数类型定义 */
export type FilterCondition = (value: any, datum: Datum, idx?: number) => boolean;
/**
 * @title chart.axis() 参数类型
 */
export type AxisOption = AxisCfg | boolean;
/**
 * @title chart.legend() 参数类型
 */
export type LegendOption = LegendCfg | boolean;
/**
 * @title Options 中 legends 的配置定义
 */
export type AllLegendsOptions = LegendCfg | Record<string, LegendOption> | boolean;
/**
 * @title G2 支持的度量类型
 */
export type ScaleType =
  | 'linear'
  | 'cat'
  | 'category'
  | 'identity'
  | 'log'
  | 'pow'
  | 'time'
  | 'timeCat'
  | 'quantize'
  | 'quantile';

export type CoordinateRotate = ['rotate', number];
export type CoordinateReflect = ['reflect', 'x' | 'y'];
export type CoordinateScale = ['scale', number, number];
export type CoordinateTranspose = ['transpose'];
/**
 * @title 坐标系支持的 action 配置
 */
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
  /**
   * @title 布局类型。
   */
  readonly type?: string;
  /**
   * @title view 创建回调。
   */
  readonly eachView: (innerView: View, facet?: D) => any;
  /**
   * @title 分面 view 之间的间隔， 百分比或像素值
   */
  readonly spacing?: [number | string, number | string];
  /**
   * @title facet view padding。
   */
  readonly padding?: ViewPadding;
  /**
   * @title 是否显示标题。
   */
  readonly showTitle?: boolean;
  /**
   * @title facet 数据划分维度。
   */
  readonly fields: string[];
}

/**
 * Facet title 配置项
 */
export interface FacetTitle {
  /**
   * @title x 方向偏移。
   */
  readonly offsetX?: number;
  /**
   * @title y 方向偏移。
   */
  readonly offsetY?: number;
  /**
   * @title 文本样式。
   */
  readonly style?: object;
  /**
   * @title 格式化
   */
  readonly formatter?: (val: any) => any;
}

/**
 * 分面数据
 */
export interface FacetData {
  /**
   * @title 分面类型。
   */
  readonly type: string;
  /**
   * @title 当前分面子 view 的数据。
   */
  readonly data: object[];
  /**
   * @title 当前分面子 view 的范围。
   */
  readonly region: Region;
  /**
   * @title 当前分面子 view 的 padding。
   */
  readonly padding?: number;
  /**
   * @title 当前 facet 对应生成的 view。
   */
  view?: View;

  // facet data
  /**
   * @title 分面行字段。
   */
  readonly rowField: string;
  /**
   * @title 分面列字段。
   */
  readonly columnField: string;
  /**
   * @title 当前行分面的枚举值。
   */
  readonly rowValue: string;
  /**
   * @title 当前列分面的枚举值。
   */
  readonly columnValue: string;
  /**
   * @title 当前行索引。
   */
  readonly rowIndex: number;
  /**
   * @title 当前列索引。
   */
  readonly columnIndex: number;
  /**
   * @title 当前行字段的枚举值长度。
   */
  readonly rowValuesLength: number;
  /**
   * @title 当前列字段的枚举值长度。
   */
  readonly columnValuesLength: number;
}

// ===================== rect 相关类型定义 =====================
/**
 * @title rect 分面类型配置
 */
export interface RectCfg extends FacetCfg<RectData> {
  /**
   * @title 行标题的样式。
   */
  readonly columnTitle?: FacetTitle;
  /**
   * @title 列标题的样式。
   */
  readonly rowTitle?: FacetTitle;
}

export type RectData = FacetData;

// ===================== mirror 相关类型定义 =====================
/**
 * @title mirror 分面类型配置
 */
export interface MirrorCfg extends FacetCfg<MirrorData> {
  /**
   * @title 是否转置。
   */
  readonly transpose?: boolean;
  /**
   * @title 标题样式。
   */
  readonly title?: FacetTitle;
}

export type MirrorData = FacetData;

// ===================== list 相关类型定义 =====================
/**
 * @title list 分面类型配置
 */
export interface ListCfg extends FacetCfg<ListData> {
  /**
   * @title 指定每行可显示分面的个数，超出时会自动换行。
   */
  readonly cols?: number;
  /**
   * @title 每个分面标题配置。
   */
  readonly title?: FacetTitle;
}

export interface ListData extends FacetData {
  readonly total?: number;
}

// ===================== matrix 相关类型定义 =====================
/**
 * @title matrix 分面类型配置
 */
export interface MatrixCfg extends FacetCfg<MirrorData> {
  /**
   * @title 列标题的样式
   */
  readonly columnTitle?: FacetTitle;
  /**
   * @title 列标题的样式
   */
  readonly rowTitle?: FacetTitle;
}

export type MatrixData = FacetData;

// ===================== circle 相关类型定义 =====================
/**
 * @title circle 分面类型配置
 */
export interface CircleCfg extends FacetCfg<CircleData> {
  /**
   * @title 分面标题配置。
   */
  readonly title?: FacetTitle;
}

export type CircleData = FacetData;

// ===================== tree 相关类型定义 =====================

export interface Line {
  readonly style?: ShapeAttrs;
  readonly smooth?: boolean;
}
/**
 * @title tree 分面类型配置
 */
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
  /**
   * @title rect 类型分面配置
   */
  readonly rect: RectCfg;
  /**
   * @title mirror 类型分面配置
   */
  readonly mirror: MirrorCfg;
  /**
   * @title list 类型分面配置
   */
  readonly list: ListCfg;
  /**
   * @title matrix 类型分面配置
   */
  readonly matrix: MatrixCfg;
  /**
   * @title circle 类型分面配置
   */
  readonly circle: CircleCfg;
  /**
   * @title tree 类型分面配置
   */
  readonly tree: TreeCfg;
}

// ============================ 主题样式表定义 ============================
export interface StyleSheet {
  /**
   * @title 背景色
   */
  backgroundColor?: string;
  /**
   * @title 主题色
   */
  brandColor?: string;
  /**
   * @title 辅助色
   */
  subColor?: string;
  /**
   * @title 分类色板 1，在数据量小于等于 10 时使用
   */
  paletteQualitative10?: string[];
  /**
   * @title 分类色板 2，在数据量大于 10 时使用
   */
  paletteQualitative20?: string[];
  /**
   * @title 语义色
   */
  paletteSemanticRed?: string;
  /**
   * @title 语义色
   */
  paletteSemanticGreen?: string;
  /**
   * @title 语义色
   */
  paletteSemanticYellow?: string;
  /**
   * @title (单色)顺序色板
   */
  paletteSequence?: string[];
  /**
   * @title 字体
   */
  fontFamily?: string;

  // -------------------- 坐标轴 --------------------
  /**
   * @title 坐标轴线颜色
   */
  axisLineBorderColor?: string;
  /**
   * @title 坐标轴线粗细
   */
  axisLineBorder?: number;
  /**
   * @title 坐标轴线 lineDash 设置
   */
  axisLineDash?: number[];

  /**
   * @title 坐标轴标题颜色
   */
  axisTitleTextFillColor?: string;
  /**
   * @title 坐标轴标题文本字体大小
   */
  axisTitleTextFontSize?: number;
  /**
   * @title 坐标轴标题文本行高
   */
  axisTitleTextLineHeight?: number;
  /**
   * @title 坐标轴标题文本字体粗细
   */
  axisTitleTextFontWeight?: number | string;
  /**
   * @title 坐标轴标题距离坐标轴文本的间距
   */
  axisTitleSpacing?: number;
  /**
   * @title 坐标轴详细说明icon颜色
   */
  axisDescriptionIconFillColor?: string;
  /**
   * @title 坐标轴刻度线颜色
   */
  axisTickLineBorderColor?: string;
  /**
   * @title 坐标轴刻度线长度
   */
  axisTickLineLength?: number;
  /**
   * @title 坐标轴刻度线粗细
   */
  axisTickLineBorder?: number;

  /**
   * @title 坐标轴次刻度线颜色
   */
  axisSubTickLineBorderColor?: string;
  /**
   * @title 坐标轴次刻度线长度
   */
  axisSubTickLineLength?: number;
  /**
   * @title 坐标轴次刻度线粗细
   */
  axisSubTickLineBorder?: number;

  /**
   * @title 坐标轴刻度文本颜色
   */
  axisLabelFillColor?: string;
  /**
   * @title 坐标轴刻度文本字体大小
   */
  axisLabelFontSize?: number;
  /**
   * @title 坐标轴刻度文本行高
   */
  axisLabelLineHeight?: number;
  /**
   * @title 坐标轴刻度文本字体粗细
   */
  axisLabelFontWeight?: number | string;
  /**
   * @title 坐标轴刻度文本距离坐标轴线的间距
   */
  axisLabelOffset: number;

  /**
   * @title 坐标轴网格线颜色
   */
  axisGridBorderColor?: string;
  /**
   * @title 坐标轴网格线粗细
   */
  axisGridBorder?: number;
  /**
   * @title 坐标轴网格线虚线设置
   */
  axisGridLineDash?: number[];

  // -------------------- 图例 --------------------
  /**
   * @title 图例标题颜色
   */
  legendTitleTextFillColor?: string;
  /**
   * @title 图例标题文本字体大小
   */
  legendTitleTextFontSize?: number;
  /**
   * @title 图例标题文本行高
   */
  legendTitleTextLineHeight?: number;
  /**
   * @title 图例标题文本字体粗细
   */
  legendTitleTextFontWeight?: number | string;

  /**
   * @title 图例 marker 颜色
   */
  legendMarkerColor?: string;
  /**
   * @title 图例 marker 距离图例文本的间距
   */
  legendMarkerSpacing?: number;
  /**
   * @title 图例 marker 默认半径大小
   */
  legendMarkerSize?: number;
  /**
   * @title 图例 'circle' marker 半径
   */
  legendCircleMarkerSize?: number;
  /**
   * @title 图例 'square' marker 半径
   */
  legendSquareMarkerSize?: number;
  /**
   * @title 图例 'line' marker 半径
   */
  legendLineMarkerSize?: number;

  /**
   * @title 图例项文本颜色
   */
  legendItemNameFillColor?: string;
  /**
   * @title 图例项文本字体大小
   */
  legendItemNameFontSize?: number;
  /**
   * @title 图例项文本行高
   */
  legendItemNameLineHeight?: number;
  /**
   * @title 图例项粗细
   */
  legendItemNameFontWeight?: number | string;
  /**
   * @title 图例项之间的水平间距
   */
  legendItemSpacing?: number;
  /**
   * @title 图例项垂直方向的间隔
   */
  legendItemMarginBottom?: number;
  /**
   * @title 图例与图表绘图区域的偏移距离
   */
  legendPadding?: number[];
  /**
   * @title 水平布局的图例与绘图区域偏移距离
   */
  legendHorizontalPadding?: number[];
  /**
   * @title 垂直布局的图例与绘图区域偏移距离
   */
  legendVerticalPadding?: number[];

  /**
   * @title 图例分页器 marker 大小
   */
  legendPageNavigatorMarkerSize: number;
  /**
   * @title 图例分页器 marker 非激活状态填充色
   */
  legendPageNavigatorMarkerInactiveFillColor: string;
  /**
   * @title 图例分页器 marker 非激活状态填充色透明度
   */
  legendPageNavigatorMarkerInactiveFillOpacity: number;
  /**
   * @title 图例分页器 marker 填充色
   */
  legendPageNavigatorMarkerFillColor: string;
  /**
   * @title 图例分页器 marker 填充色透明度
   */
  legendPageNavigatorMarkerFillOpacity: number;
  /**
   * @title 图例分页器文本颜色
   */
  legendPageNavigatorTextFillColor: string;
  /**
   * @title 图例分页器文本字体大小
   */
  legendPageNavigatorTextFontSize: number;

  /**
   * @title 连续图例滑块填充色
   */
  sliderRailFillColor?: string;
  /**
   * @title 连续图例滑块边框粗细
   */
  sliderRailBorder?: number;
  /**
   * @title 连续图例滑块边框颜色
   */
  sliderRailBorderColor?: string;
  /**
   * @title 连续图例滑块宽度
   */
  sliderRailWidth?: number;
  /**
   * @title 连续图例滑块高度
   */
  sliderRailHeight?: number;

  /**
   * @title 连续图例文本颜色
   */
  sliderLabelTextFillColor?: string;
  /**
   * @title 连续图例文本字体大小
   */
  sliderLabelTextFontSize?: number;
  /**
   * @title 连续图例文本行高
   */
  sliderLabelTextLineHeight?: number;
  /**
   * @title 连续图例文本字体粗细
   */
  sliderLabelTextFontWeight?: number | string;

  /**
   * @title 连续图例滑块颜色
   */
  sliderHandlerFillColor?: string;
  /**
   * @title 连续图例滑块宽度
   */
  sliderHandlerWidth?: number;
  /**
   * @title 连续图例滑块高度
   */
  sliderHandlerHeight?: number;
  /**
   * @title 连续图例滑块边框粗细
   */
  sliderHandlerBorder?: number;
  /**
   * @title 连续图例滑块边框颜色
   */
  sliderHandlerBorderColor?: string;

  // -------------------- Annotation，图形标注 --------------------
  /**
   * @title arc 图形标注描边颜色
   */
  annotationArcBorderColor?: string;
  /**
   * @title arc 图形标注粗细
   */
  annotationArcBorder?: number;

  /**
   * @title line 图形标注颜色
   */
  annotationLineBorderColor?: string;
  /**
   * @title line 图形标注粗细
   */
  annotationLineBorder?: number;
  /**
   * @title lube 图形标注的虚线间隔
   */
  annotationLineDash?: number[];

  /**
   * @title text 图形标注文本颜色
   */
  annotationTextFillColor?: string;
  /**
   * @title text 图形标注文本字体大小
   */
  annotationTextFontSize?: number;
  /**
   * @title text 图形标注文本行高
   */
  annotationTextLineHeight?: number;
  /**
   * @title text 图形标注文本字体粗细
   */
  annotationTextFontWeight?: number | string;

  /**
   * @title text 图形标注文本边框颜色
   */
  annotationTextBorderColor?: string;
  /**
   * @title text 图形标注文本边框粗细
   */
  annotationTextBorder?: number;

  /**
   * @title region 图形标注填充颜色
   */
  annotationRegionFillColor?: string;
  /**
   * @title region 图形标注填充颜色透明色
   */
  annotationRegionFillOpacity?: number;
  /**
   * @title region 图形标注描边粗细
   */
  annotationRegionBorder?: number;
  /**
   * @title region 图形标注描边颜色
   */
  annotationRegionBorderColor?: string;

  /**
   * @title dataMarker 图形标注的连接线长度
   */
  annotationDataMarkerLineLength?: number;

  // -------------------- Tooltip --------------------
  /**
   * @title tooltip crosshairs 辅助线颜色
   */
  tooltipCrosshairsBorderColor?: string;
  /**
   * @title tooltip crosshairs 辅助线粗细
   */
  tooltipCrosshairsBorder?: number;
  /**
   * @title tooltip crosshairs 辅助线虚线间隔
   */
  tooltipCrosshairsLineDash?: number[];

  /**
   * @title tooltip 内容框背景色
   */
  tooltipContainerFillColor?: string;
  /**
   * @title tooltip 内容框背景透明度
   */
  tooltipContainerFillOpacity?: number;
  /**
   * @title tooltip 内容框阴影
   */
  tooltipContainerShadow?: string;
  /**
   * @title tooltip 内容框圆角
   */
  tooltipContainerBorderRadius?: number;

  /**
   * @title tooltip 文本颜色
   */
  tooltipTextFillColor?: string;
  /**
   * @title tooltip 文本字体大小
   */
  tooltipTextFontSize?: number;
  /**
   * @title tooltip 文本行高
   */
  tooltipTextLineHeight?: number;
  /**
   * @title tooltip 文本字体粗细
   */
  tooltipTextFontWeight?: number | string;

  // -------------------- Geometry labels --------------------
  /**
   * @title Geometry label 文本颜色
   */
  labelFillColor?: string;
  /**
   * @title Geometry label 暗色文本颜色
   */
  labelFillColorDark?: string;
  /**
   * @title Geometry label 亮色文本颜色
   */
  labelFillColorLight?: string;
  /**
   * @title Geometry label 文本字体大小
   */
  labelFontSize?: number;
  /**
   * @title Geometry label 文本行高
   */
  labelLineHeight?: number;
  /**
   * @title Geometry label 文本字体粗细
   */
  labelFontWeight?: number | string;
  /**
   * @title Geometry label 文本描边颜色
   */
  labelBorderColor?: string;
  /**
   * @title Geometry label 文本描边粗细
   */
  labelBorder?: number;

  /**
   * @title Geometry innerLabel 文本颜色
   */
  innerLabelFillColor?: string;
  /**
   * @title Geometry innerLabel 文本字体大小
   */
  innerLabelFontSize?: number;
  /**
   * @title Geometry innerLabel 文本行高
   */
  innerLabelLineHeight?: number;
  /**
   * @title Geometry innerLabel 文本字体粗细
   */
  innerLabelFontWeight?: number | string;
  /**
   * @title Geometry innerLabel 文本描边颜色
   */
  innerLabelBorderColor?: string;
  /**
   * @title Geometry innerLabel 文本描边粗细
   */
  innerLabelBorder?: number;

  /**
   * @title Geometry overflowLabel 文本颜色
   */
  overflowLabelFillColor?: string;
  /**
   * @title Geometry overflowLabel 暗色文本颜色
   */
  overflowLabelFillColorDark?: string;
  /**
   * @title Geometry overflowLabel 亮色文本颜色
   */
  overflowLabelFillColorLight?: string;
  /**
   * @title Geometry overflowLabel 文本字体大小
   */
  overflowLabelFontSize?: number;
  /**
   * @title Geometry overflowLabel 文本行高
   */
  overflowLabelLineHeight?: number;
  /**
   * @title Geometry overflowLabel 文本字体粗细
   */
  overflowLabelFontWeight?: number | string;
  /**
   * @title Geometry overflowLabel 文本描边颜色
   */
  overflowLabelBorderColor?: string;
  /**
   * @title Geometry overflowLabel 文本描边粗细
   */
  overflowLabelBorder?: number;

  /**
   * @title Geometry label 文本连接线粗细
   */
  labelLineBorder?: number;
  /**
   * @title Geometry label 文本连接线颜色
   */
  labelLineBorderColor?: string;

  // -------------------- Slider 组件样式--------------------
  /**
   * @title slider 滑道高度
   */
  cSliderRailHieght?: number;
  /**
   * @title slider 滑道背景色
   */
  cSliderBackgroundFillColor?: string;
  /**
   * @title slider 滑道背景色透明度
   */
  cSliderBackgroundFillOpacity?: number;
  /**
   * @title slider 滑道前景色
   */
  cSliderForegroundFillColor?: string;
  /**
   * @title slider 滑道前景色透明度
   */
  cSliderForegroundFillOpacity?: number;

  // slider handlerStyle 手柄样式
  /**
   * @title slider 手柄高度
   */
  cSliderHandlerHeight?: number;
  /**
   * @title Slider 手柄宽度
   */
  cSliderHandlerWidth?: number;
  /**
   * @title Slider 手柄背景色
   */
  cSliderHandlerFillColor?: string;
  /**
   * @title Slider 手柄背景色透明度
   */
  cSliderHandlerFillOpacity?: number;
  /**
   * @title Slider 手柄高亮背景色
   */
  cSliderHandlerHighlightFillColor?: string;
  /**
   * @title Slider 手柄边框色
   */
  cSliderHandlerBorderColor?: string;
  /**
   * @title Slider 手柄边框粗细
   */
  cSliderHandlerBorder?: number;
  /**
   * @title Slider 手柄边框圆角
   */
  cSliderHandlerBorderRadius?: number;

  // slider textStyle 字体标签样式
  /**
   * @title Slider 字体标签颜色
   */
  cSliderTextFillColor?: string;
  /**
   * @title Slider 字体标签透明度
   */
  cSliderTextFillOpacity?: number;
  /**
   * @title Slider 字体标签大小
   */
  cSliderTextFontSize?: number;
  /**
   * @title Slider 字体标签行高
   */
  cSliderTextLineHeight?: number;
  /**
   * @title Slider 字体标签字重
   */
  cSliderTextFontWeight?: number | string;
  /**
   * @title Slider 字体标签描边色
   */
  cSliderTextBorderColor?: string;
  /**
   * @title Slider 字体标签描边粗细
   */
  cSliderTextBorder?: number;

  // -------------------- Scrollbar 组件样式--------------------
  /**
   * @title 滚动条 滚道填充色
   */
  scrollbarTrackFillColor?: string;
  /**
   * @title 滚动条 滑块填充色
   */
  scrollbarThumbFillColor?: string;
  /**
   * @title 滚动条 滑块高亮填充色
   */
  scrollbarThumbHighlightFillColor?: string;

  // -------------------- Geometry 图形样式--------------------
  /**
   * @title 点图的大小范围
   */
  pointSizeRange?: [number, number];
  /**
   * @title 点图填充颜色
   */
  pointFillColor?: string;
  /**
   * @title 点图填充颜色透明度
   */
  pointFillOpacity?: number;
  /**
   * @title 点图大小
   */
  pointSize?: number;
  /**
   * @title 点图描边粗细
   */
  pointBorder?: number;
  /**
   * @title 点图描边颜色
   */
  pointBorderColor?: string;
  /**
   * @title 点图描边透明度
   */
  pointBorderOpacity?: number;

  /**
   * @title 点图 active 状态下填充颜色
   */
  pointActiveFillColor?: string;
  /**
   * @title 点图 active 状态下填充颜色透明度
   */
  pointActiveFillOpacity?: number;
  /**
   * @title 点图 active 状态下大小
   */
  pointActiveSize?: number;
  /**
   * @title 点图 active 状态下描边粗细
   */
  pointActiveBorder?: number;
  /**
   * @title 点图 active 状态下描边颜色
   */
  pointActiveBorderColor?: string;
  /**
   * @title 点图 active 状态下描边透明度
   */
  pointActiveBorderOpacity?: number;

  /**
   * @title 点图 selected 状态下填充颜色
   */
  pointSelectedFillColor?: string;
  /**
   * @title 点图 selected 状态下填充颜色透明度
   */
  pointSelectedFillOpacity?: number;
  /**
   * @title 点图 selected 状态下大小
   */
  pointSelectedSize?: number;
  /**
   * @title 点图 selected 状态下描边粗细
   */
  pointSelectedBorder?: number;
  /**
   * @title 点图 selected 状态下描边颜色
   */
  pointSelectedBorderColor?: string;
  /**
   * @title 点图 selected 状态下描边透明度
   */
  pointSelectedBorderOpacity?: number;

  /**
   * @title 点图 inactive 状态下填充颜色
   */
  pointInactiveFillColor?: string;
  /**
   * @title 点图 inactive 状态下填充颜色透明度
   */
  pointInactiveFillOpacity?: number;
  /**
   * @title 点图 inactive 状态下大小
   */
  pointInactiveSize?: number;
  /**
   * @title 点图 inactive 状态下描边粗细
   */
  pointInactiveBorder?: number;
  /**
   * @title 点图 inactive 状态下描边颜色
   */
  pointInactiveBorderColor?: string;
  /**
   * @title 点图 inactive 状态下描边透明度
   */
  pointInactiveBorderOpacity?: number;

  /**
   * @title 描边点图大小
   */
  hollowPointSize?: number;
  /**
   * @title 描边点图描边粗细
   */
  hollowPointBorder?: number;
  /**
   * @title 描边点图描边颜色
   */
  hollowPointBorderColor?: string;
  /**
   * @title 描边点图描边透明度
   */
  hollowPointBorderOpacity?: number;
  /**
   * @title 描边点图填充颜色
   */
  hollowPointFillColor?: string;
  /**
   * @title 描边点图填充透明度
   */
  hollowPointFillOpacity?: number;

  /**
   * @title 点 描边 active 状态下大小
   */
  hollowPointActiveSize?: number;
  /**
   * @title 点 描边 active 状态下描边粗细
   */
  hollowPointActiveBorder?: number;
  /**
   * @title 点 描边 active 状态下描边颜色
   */
  hollowPointActiveBorderColor?: string;
  /**
   * @title 点 描边 active 状态下描边透明度
   */
  hollowPointActiveBorderOpacity?: number;

  /**
   * @title 点 描边 selected 状态下大小
   */
  hollowPointSelectedSize?: number;
  /**
   * @title 点 描边 selected 状态下描边粗细
   */
  hollowPointSelectedBorder?: number;
  /**
   * @title 点 描边 selected 状态下描边颜色
   */
  hollowPointSelectedBorderColor?: string;
  /**
   * @title 点 描边 selected 状态下描边透明度
   */
  hollowPointSelectedBorderOpacity?: number;

  /**
   * @title 点 描边 inactive 状态下大小
   */
  hollowPointInactiveSize?: number;
  /**
   * @title 点 描边 inactive 状态下描边粗细
   */
  hollowPointInactiveBorder?: number;
  /**
   * @title 点 描边 inactive 状态下描边颜色
   */
  hollowPointInactiveBorderColor?: string;
  /**
   * @title 点 描边 inactive 状态下描边透明度
   */
  hollowPointInactiveBorderOpacity?: number;

  /**
   * @title 线图粗细
   */
  lineBorder?: number;
  /**
   * @title 线图颜色
   */
  lineBorderColor?: string;
  /**
   * @title 线图透明度
   */
  lineBorderOpacity?: number;

  /**
   * @title 线图 active 状态下粗细
   */
  lineActiveBorder?: number;
  /**
   * @title 线图 active 状态下颜色
   */
  lineActiveBorderColor?: string;
  /**
   * @title 线图 active 状态下透明度
   */
  lineActiveBorderOpacity?: number;

  /**
   * @title 线图 selected 状态下粗细
   */
  lineSelectedBorder?: number;
  /**
   * @title 线图 selected 状态下颜色
   */
  lineSelectedBorderColor?: string;
  /**
   * @title 线图 selected 状态下透明度
   */
  lineSelectedBorderOpacity?: number;

  /**
   * @title 线图 inactive 状态下粗细
   */
  lineInactiveBorder?: number;
  /**
   * @title 线图 inactive 状态下颜色
   */
  lineInactiveBorderColor?: string;
  /**
   * @title 线图 inactive 状态下透明度
   */
  lineInactiveBorderOpacity?: number;

  areaBorder?: number;
  /**
   * @title area 边框颜色
   */
  areaBorderColor?: string;
  /**
   * @title area 边框透明度
   */
  areaBorderOpacity?: number;
  /**
   * @title area 填充颜色
   */
  areaFillColor?: string;
  /**
   * @title area 填充透明度
   */
  areaFillOpacity?: number;

  /**
   * @title area Active 状态下边框粗细
   */
  areaActiveBorder?: number;
  /**
   * @title area Active 状态下边框颜色
   */
  areaActiveBorderColor?: string;
  /**
   * @title area Active 状态下边框透明度
   */
  areaActiveBorderOpacity?: number;
  /**
   * @title area Active 状态下填充颜色
   */
  areaActiveFillColor?: string;
  /**
   * @title area Active 状态下填充透明度
   */
  areaActiveFillOpacity?: number;

  /**
   * @title area selected 状态下边框粗细
   */
  areaSelectedBorder?: number;
  /**
   * @title area selected 状态下边框颜色
   */
  areaSelectedBorderColor?: string;
  /**
   * @title area selected 状态下边框透明度
   */
  areaSelectedBorderOpacity?: number;
  /**
   * @title area selected 状态下填充颜色
   */
  areaSelectedFillColor?: string;
  /**
   * @title area selected 状态下填充透明度
   */
  areaSelectedFillOpacity?: number;

  /**
   * @title area inactive 状态下边框粗细
   */
  areaInactiveBorder?: number;
  /**
   * @title area inactive 状态下边框颜色
   */
  areaInactiveBorderColor?: string;
  /**
   * @title area inactive 状态下边框透明度
   */
  areaInactiveBorderOpacity?: number;
  /**
   * @title area inactive 状态下填充颜色
   */
  areaInactiveFillColor?: string;
  /**
   * @title area inactive 状态下填充透明度
   */
  areaInactiveFillOpacity?: number;

  /**
   * @title hollowArea 边框粗细
   */
  hollowAreaBorder?: number;
  /**
   * @title hollowArea 边框颜色
   */
  hollowAreaBorderColor?: string;
  /**
   * @title hollowArea 边框透明度
   */
  hollowAreaBorderOpacity?: number;

  /**
   * @title hollowArea Active 状态下边框粗细
   */
  hollowAreaActiveBorder?: number;
  /**
   * @title hollowArea Active 状态下边框颜色
   */
  hollowAreaActiveBorderColor?: string;
  /**
   * @title hollowArea Active 状态下边框透明度
   */
  hollowAreaActiveBorderOpacity?: number;

  /**
   * @title hollowArea selected 状态下边框粗细
   */
  hollowAreaSelectedBorder?: number;
  /**
   * @title hollowArea selected 状态下边框颜色
   */
  hollowAreaSelectedBorderColor?: string;
  /**
   * @title hollowArea selected 状态下边框透明度
   */
  hollowAreaSelectedBorderOpacity?: number;

  /**
   * @title hollowArea inactive 状态下边框粗细
   */
  hollowAreaInactiveBorder?: number;
  /**
   * @title hollowArea inactive 状态下边框颜色
   */
  hollowAreaInactiveBorderColor?: string;
  /**
   * @title hollowArea inactive 状态下边框透明度
   */
  hollowAreaInactiveBorderOpacity?: number;

  /**
   * @title interval 边框粗细
   */
  intervalBorder?: number;
  /**
   * @title interval 边框颜色
   */
  intervalBorderColor?: string;
  /**
   * @title interval 边框透明度
   */
  intervalBorderOpacity?: number;
  /**
   * @title interval 填充颜色
   */
  intervalFillColor?: string;
  /**
   * @title interval 填充透明度
   */
  intervalFillOpacity?: number;

  /**
   * @title interval active 状态下边框粗细
   */
  intervalActiveBorder?: number;
  /**
   * @title interval active 状态下边框颜色
   */
  intervalActiveBorderColor?: string;
  /**
   * @title interval active 状态下边框透明度
   */
  intervalActiveBorderOpacity?: number;
  /**
   * @title interval active 状态下填充颜色
   */
  intervalActiveFillColor?: string;
  /**
   * @title interval active 状态下填充透明度
   */
  intervalActiveFillOpacity?: number;

  /**
   * @title interval selected 状态下边框粗细
   */
  intervalSelectedBorder?: number;
  /**
   * @title interval selected 状态下边框颜色
   */
  intervalSelectedBorderColor?: string;
  /**
   * @title interval selected 状态下边框透明度
   */
  intervalSelectedBorderOpacity?: number;
  /**
   * @title interval selected 状态下填充颜色
   */
  intervalSelectedFillColor?: string;
  /**
   * @title interval selected 状态下填充透明度
   */
  intervalSelectedFillOpacity?: number;

  /**
   * @title interval inactive 状态下边框粗细
   */
  intervalInactiveBorder?: number;
  /**
   * @title interval inactive 状态下边框颜色
   */
  intervalInactiveBorderColor?: string;
  /**
   * @title interval inactive 状态下边框透明度
   */
  intervalInactiveBorderOpacity?: number;
  /**
   * @title interval inactive 状态下填充颜色
   */
  intervalInactiveFillColor?: string;
  /**
   * @title interval inactive 状态下填充透明度
   */
  intervalInactiveFillOpacity?: number;

  /**
   * @title hollowInterval 边框粗细
   */
  hollowIntervalBorder?: number;
  /**
   * @title hollowInterval 边框颜色
   */
  hollowIntervalBorderColor?: string;
  /**
   * @title hollowInterval 边框透明度
   */
  hollowIntervalBorderOpacity?: number;
  /**
   * @title hollowInterval 填充颜色
   */
  hollowIntervalFillColor?: string;
  /**
   * @title hollowInterval 填充透明度
   */
  hollowIntervalFillOpacity?: number;

  /**
   * @title hollowInterval active 状态下边框粗细
   */
  hollowIntervalActiveBorder?: number;
  /**
   * @title hollowInterval active 状态下边框颜色
   */
  hollowIntervalActiveBorderColor?: string;
  /**
   * @title hollowInterval active 状态下边框透明度
   */
  hollowIntervalActiveBorderOpacity?: number;

  /**
   * @title hollowInterval selected 状态下边框粗细
   */
  hollowIntervalSelectedBorder?: number;
  /**
   * @title hollowInterval selected 状态下边框颜色
   */
  hollowIntervalSelectedBorderColor?: string;
  /**
   * @title hollowInterval selected 状态下边框透明度
   */
  hollowIntervalSelectedBorderOpacity?: number;

  /**
   * @title hollowInterval inactive 状态下边框粗细
   */
  hollowIntervalInactiveBorder?: number;
  /**
   * @title hollowInterval inactive 状态下边框颜色
   */
  hollowIntervalInactiveBorderColor?: string;
  /**
   * @title hollowInterval inactive 状态下边框透明度
   */
  hollowIntervalInactiveBorderOpacity?: number;
}

/**
 * @title createTheme 主题样式表配置
 */
export type StyleSheetCfg = Partial<StyleSheet>;

// ============================ 交互相关的类型定义 ============================
/**
 * @title 交互反馈的定义
 */
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

/**
 * @title 交互上下文的接口定义
 */
export interface IInteractionContext extends LooseObject {
  /**
   * @title 事件对象
   */
  event: LooseObject;
  /**
   * 当前的 view
   */
  view: View;
  /**
   * @title 交互相关的 Actions
   */
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

/**
 * @title G 的渲染类型
 */
export type Renderer = 'svg' | 'canvas';
/**
 * @title 数据的定义
 */
export type Datum = Record<string, any>;
export type Data = Datum[];
export type ActionCallback = (context: IInteractionContext) => void;
export type Padding = [number, number, number, number];
export type ViewPadding = number | number[] | 'auto';
export type ViewAppendPadding = number | number[];
export type Position = [number, number];
export type AttributeType = 'position' | 'size' | 'color' | 'shape';
export type ShapeVertices = RangePoint[] | Point[] | Point[][];
/**
 * @title easing 的回调函数， 入参 data 为对应的原始数据记录
 */
export type AnimateEasingCallback = (data: Datum) => string;
/**
 * @title delay 的回调函数， 入参 data 为对应的原始数据记录
 */
export type AnimateDelayCallback = (data: Datum) => number;
/**
 * @title duration 的回调函数， 入参 data 为对应的原始数据记录
 */
export type AnimateDurationCallback = (data: Datum) => number;
