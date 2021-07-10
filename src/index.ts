export const VERSION = '5.0.0-beta.1';

/** 通用的类型定义 */
export { Datum, Data } from './types';

export { ORIGINAL_FIELD } from './constant';

/**
 * 容器
 */
export { Chart, View } from './chart';

/**
 * 图形 geometry
 */
export { Geometry, Element } from './geometry';

/**
 * 主题相关方法和常量
 */
export { getTheme, registerTheme, LIGHT_STYLESHEET, DARK_STYLESHEET } from './theme';
export type { StyleSheet } from './types/theme';
