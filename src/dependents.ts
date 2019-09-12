/* 依赖的模块，在这里统一引入，方便打包优化 */

// 只引入框架，不引入内容
export { registerScale, getScale, Scale } from '@antv/scale/lib/factory';
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust/lib/factory';
export { getCoord, Coord } from '@antv/coord/lib/factory';
export { getAttribute, Attribute, colorUtil } from '@antv/attr/lib/factory';
