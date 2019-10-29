/* 依赖的模块，在这里统一引入，方便打包优化 */

// 只引入框架，不引入内容
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust/lib/factory';
export { getAttribute, Attribute, colorUtil } from '@antv/attr/lib/factory';
export { ICanvas, IGroup, IShape } from '@antv/g-base/lib/interfaces';

// coordinate 全部引入即可
export { getCoordinate, registerCoordinate, Coordinate, CoordinateCfg } from '@antv/coord';
export { getScale, registerScale, Scale, ScaleConfig } from '@antv/scale';
export { Canvas, Group, Shape, Event } from '@antv/g-canvas';
