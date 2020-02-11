import { AnimateCfg } from '../animate/interface';
import { AnimateOption } from '../chart/interface';
import { IGroup, IShape } from '../dependents';
import { Datum, LooseObject, MappingDatum } from '../interface';
import Element from './element';

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
export interface TooltipOption {
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
  animate?: AnimateCfg | null;
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
