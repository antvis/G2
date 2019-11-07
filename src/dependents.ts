/* 依赖的模块，在这里统一引入，方便打包优化 */

// 只引入框架，不引入内容
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust/lib/factory';
export { getAttribute, Attribute, colorUtil } from '@antv/attr/lib/factory';
export { ICanvas, IGroup, IShape } from '@antv/g-base/lib/interfaces';
export { PathCommand } from '@antv/g-base/lib/types';

// coordinate 全部引入即可
export { getCoordinate, registerCoordinate, Coordinate, CoordinateCfg } from '@antv/coord';
export { getScale, registerScale, Scale, ScaleConfig } from '@antv/scale';
export { Tick } from '@antv/scale/lib/base';
export { Canvas, Group, Shape, Event } from '@antv/g-canvas';

// 内置的 Component 组件
// axis
export { Line, Circle } from '@antv/component';
// legend
export { Category } from '@antv/component';
export { CategoryLegendCfg } from '@antv/component/lib/types';
