export * from './core';

// 注册 G2 内置的 geometry
import { registerGeometry } from './chart';

import Geometry from './geometry/geometry';
import Interval from './geometry/interval';
import Polygon from './geometry/polygon';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
