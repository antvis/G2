/* 依赖的模块，在这里统一引入，方便打包优化 */
import colorUtil from '@antv/color-util';

// 只引入框架，不引入内容
export { registerScale, getScale, Scale } from '@antv/scale';
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust';
export { getCoordinate, Coordinate } from '@antv/coord';
export { getAttribute, Attribute } from '@antv/attr';
export { colorUtil };
