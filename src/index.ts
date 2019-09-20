export * from './core';

// 注册 G2 内置的 geometry
import { registerGeometry } from './chart';

import Geometry from './geometry/geometry';
import Polygon from './geometry/polygon';

registerGeometry('Polygon', Polygon);
