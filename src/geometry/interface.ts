import { AdjustType, LooseObject } from '../interface';

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
  /** 调整类型 */
  readonly type: AdjustType;
  /**
   * type 为 'dodge' 时生效，数值范围为 0 至 1，用于调整分组中各个柱子的间距
   */
  readonly marginRatio?: number;
  /**
   * type 为 'dodge' 时生效, 按照声明的字段进行分组
   */
  readonly dodgeBy?: string;
  /**
   * type 为 'stack' 时生效，控制层叠的顺序，默认是 true
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
