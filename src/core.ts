/* G2 的一个壳子，不包含 Geometry，由开发者自己定义和引入 */

export const VER = '4.0.0-beta.1';

// API、组件 导出
export { Chart, View, registerGeometry, LAYER, DIRECTION } from './chart';
export { getTheme, registerTheme } from './theme';
export { default as Component } from './component'; // 组件基类
export { default as Geometry } from './geometry/geometry';

// 类型定义导出
export { ChartCfg, ViewCfg } from './chart';
export { Region, Point } from './interface';
