import { AdjustType, AnimateOption, Datum, LooseObject, MappingDatum } from '../interface';

/** 图形属性配置项定义，如 position({}) */
export interface AttributeOption {
  /** 映射的属性字段 */
  fields?: string[];
  /** 回调函数 */
  callback?: (...args) => any;
  /** 指定常量映射规则 */
  values?: any[];
}

/** 数据调整配置项定义，`adjust({})` */
export interface AdjustOption {
  /** adjust type */
  readonly type: AdjustType;
  /**
   * only works when type is 'dodge', the value should between 0 and 1
   * used to adjust the spacing of individual columns in a group
   */
  readonly marginRatio?: number;
  /**
   * only works when type is 'dodge'
   * declare which field to group by
   */
  readonly dodgeBy?: string;
  /**
   * only works when type is 'stack'
   * whether or not to reverse data
   */
  readonly reverseOrder?: boolean;
}

/** `style({})` 样式配置定义 */
export interface StyleOption {
  /** 映射的字段 */
  readonly fields?: string[];
  /** 回调函数 */
  readonly callback?: (...args) => LooseObject;
  /** 图形样式配置 */
  readonly cfg?: LooseObject;
}

/** `tooltip({})` Tooltip 配置定义 */
export interface TooltipOption {
  /** 参与映射的字段 */
  readonly fields: string[];
  /** 回调函数 */
  readonly callback?: (...args) => LooseObject;
}

/** geometry label 配置属性 */
export interface GeometryLabelCfg {
  /**
   * 用于声明渲染的 label 类型
   * 当用户使用了自定义的 label 类型，需要声明具体的 type 类型，否则会使用默认的 label 类型渲染
   */
  type?: string;
  /** 相对数据点的偏移距离 */
  offset?: number;
  /** label 相对于数据点在 X 方向的偏移距离 */
  offsetX?: number;
  /** label 相对于数据点在 Y 方向的偏移距离 */
  offsetY?: number;
  /** 展示的文本内容，如果不声明则按照参与映射的第一字段的值进行显示 */
  content?: string | GeometryLabelContentCallback;
  /** label 文本图形属性样式 */
  style?: LooseObject;
  /** label 是否自动旋转，默认为 true */
  autoRotate?: boolean;
  /**
   * 当且仅当 `autoRotate` 为 false 时生效，用于设置文本的旋转角度，**弧度制**
   */
  rotate?: number;
  /**
   * 用于设置文本连接线的样式属性，null 表示不展示
   */
  labelLine?: null | boolean | { style?: object };
  /** 只对极坐标下的文本生效，表示文本是否按照角度进行放射状显示，true 表示开启，false 表示关闭 */
  labelEmit?: boolean;
  /**
   * 文本布局类型，目前提供了三种：'overlap'，'fixedOverlap'，'limitInShape'
   * 1. overlap: label 防遮挡，为了防止 label 之间相互覆盖，通过尝试向**四周偏移**来剔除放不下的 label
   * 2. fixedOverlap: 不改变 label 位置的情况下对相互重叠的 label 进行调整
   * 3. limitInShape: 剔除 shape 容纳不了的 label
   */
  layout?: string;
  /**
   * 仅当 geometry 为 interval 时生效，指定当前 label 与当前图形的相对位置
   */
  position?:
    | ((data: Datum, mappingData: MappingDatum, index: number) => IntervalGeometryLabelPosition)
    | IntervalGeometryLabelPosition;
  /** 动画配置 */
  animate?: AnimateOption | false | null;
}

/** `geometry().label({})` 配置定义 */
export interface LabelOption {
  /** 映射的字段 */
  fields?: string[];
  /** 回调函数 */
  callback?: LabelCallback;
  cfg?: GeometryLabelCfg;
}

type IntervalGeometryLabelPosition = 'top' | 'bottom' | 'middle' | 'left' | 'right';
/** color() 图形属性回调函数定义 */
export type ColorAttrCallback = (...args) => string;
/** shape() 图形属性回调函数定义 */
export type ShapeAttrCallback = (...args) => string | any[];
/** size() 图形属性回调函数定义 */
export type SizeAttrCallback = (...args) => number;
/** tooltip() 接口回调函数定义 */
export type TooltipCallback = (...args) => LooseObject;
/** style() 接口回调函数定义 */
export type StyleCallback = (...args) => LooseObject;
export type LabelCallback = (...args) => GeometryLabelCfg | null | undefined;
/** geometry label 中 content 属性的回调函数类型定义 */
export type GeometryLabelContentCallback = (data: Datum, mappingData: MappingDatum, index: number) => string;
