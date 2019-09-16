/* 依赖的模块，在这里统一引入，方便打包优化 */

// 只引入框架，不引入内容
export { registerScale, getScale, Scale } from '@antv/scale/lib/factory';
export { registerAdjust, getAdjust, Adjust } from '@antv/adjust/lib/factory';
export { getCoord as getCoordinate, Coord as Coordinate } from '@antv/coord/lib/factory';
export { getAttribute, Attribute, colorUtil } from '@antv/attr/lib/factory';

/* 注册 coordinate */
import Cartesian from '@antv/coord/lib/coord/cartesian';
import Geo from '@antv/coord/lib/coord/geo';
import Helix from '@antv/coord/lib/coord/helix';
import Polar from '@antv/coord/lib/coord/polar';
import { registerCoord as registerCoordinate } from '@antv/coord/lib/factory';

registerCoordinate('rect', Cartesian);
registerCoordinate('cartesian', Cartesian);
registerCoordinate('polar', Polar);
registerCoordinate('helix', Helix);
registerCoordinate('geo', Geo);
/* end 注册 coordinate */
