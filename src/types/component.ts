import type { ScrollbarAttrs } from '@antv/gui';
import { PlainObject } from './common';

/** 滚动条 属性配置 */
export type { ScrollbarAttrs };
/** 滚动条 主题配置 */
export type ScrollbarTheme = Pick<ScrollbarAttrs, 'isRound' | 'trackStyle' | 'thumbStyle' | 'padding'>;

/** 坐标轴 属性配置 */
export type AxisAttrs = any;
/** 坐标轴 主题配置 */
export type AxisTheme = {
  common: PlainObject;
  top: PlainObject;
  right: PlainObject;
  bottom: PlainObject;
  left: PlainObject;
  circle: PlainObject;
  radius: PlainObject;
};

/** 图例 属性配置 */
export type LegendAttrs = any;
/** 图例 主题配置 */
export type LegendTheme = {
  common: PlainObject;
  top: PlainObject;
  right: PlainObject;
  bottom: PlainObject;
  left: PlainObject;
  continuous: PlainObject;
};

/** 悬浮提示 属性配置 */
export type TooltipAttrs = any;
/** 悬浮提示 主题配置 */
export type TooltipTheme = any;

/** 缩略轴 属性配置 */
export type SliderAttrs = any;
/** 缩略轴 主题配置 */
export type SliderTheme = any;

/** 时间条 属性配置 */
export type TimelineAttrs = any;
/** 时间条 主题配置 */
export type TimelineTheme = any;
