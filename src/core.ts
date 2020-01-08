/* G2 的一个壳子，不包含 Geometry，由开发者自己定义和引入 */

export const VERSION = '4.0.0-beta.1';

// 核心基类导出
export { Chart, View, Event } from './chart'; // Chart, View 类
export { default as ComponentController } from './chart/controller/base'; // G2 组件基类
export { default as Geometry } from './geometry/base'; // Geometry 基类
export { default as GeometryLabel } from './geometry/label/base'; // Geometry Label 基类
export { Interaction } from './interaction'; // Interaction 基类
export { Facet} from './facet'; // Facet 基类
export { default as InteractionAction } from './interaction/action/base'; // Interaction Action 基类

// 注册 ComponentController
export { registerComponentController } from './chart';

// 注册 Geometry
export { registerGeometry } from './chart';

// 注册 Geometry Shape
export { registerShape, registerShapeFactory } from './geometry/shape/base';

// 注册 Geometry label
export { registerGeometryLabel } from './geometry/label';

// 注册 interaction
export { getInteraction, registerInteraction, registerAction } from './interaction';

// 注册 facet
export { getFacet, registerFacet } from './facet';

// 注册主题
export { getTheme, registerTheme } from './theme';

// G engine 管理相关
export { registerEngine, getEngine } from './engine';

// 注册动画函数
export { registerAnimation, getAnimation } from './animate/animation';

// 类型定义导出
export { ChartCfg, ViewCfg } from './chart';
export { Data, Datum, Region, Point } from './interface';
export { FacetCfg, FacetData } from './facet/interface';
export { LAYER, DIRECTION } from './constant';
