/* G2 的一个壳子，不包含 Geometry，由开发者自己定义和引入 */

export const VERSION = '4.0.0-beta.1';

// API、组件 导出
export { LAYER, DIRECTION } from './constant';
export { Chart, View, registerGeometry, Event, registerComponentController } from './chart';
export { getTheme, registerTheme } from './theme';
export { default as Component } from './component'; // 组件基类
export { default as Geometry } from './geometry/base';

// geometry
export { registerShape } from './geometry/shape/base';

// geometry label
export { registerGeometryLabels } from './geometry/label';

// facet 相关 API
export { Facet, getFacet, registerFacet } from './facet';

// interaction API
export { Interaction, getInteraction, registerInteraction } from './interaction';

// G engine 管理相关
export { registerEngine, getEngine } from './engine';

// 动画执行函数相关
export { registerAnimation, getAnimation } from './animate/animation';

// 类型定义导出
export { ChartCfg, ViewCfg } from './chart';
export { Data, Datum, Region, Point } from './interface';
export { FacetCfg, FacetData } from './facet/interface';
