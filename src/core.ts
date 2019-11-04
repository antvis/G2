/* G2 的一个壳子，不包含 Geometry，由开发者自己定义和引入 */

export const VER = '4.0.0-beta.1';

// API、组件 导出
export { LAYER, DIRECTION } from './constant';
export { Chart, View, registerGeometry, Event } from './chart';
export { getTheme, registerTheme } from './theme';
export { default as Component } from './component'; // 组件基类
export { default as Geometry } from './geometry/base';
// facet 相关 API
export { Facet, getFacet, registerFacet } from './facet';
// interaction API
export { Interaction, getInteraction, registerInteraction } from './interaction';
export { registerStateAction } from './state';

// 类型定义导出
export { ChartCfg, ViewCfg } from './chart';
export { Data, Datum, Region, Point } from './interface';
export { FacetCfg, FacetData } from './facet/interface';
