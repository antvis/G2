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
