export * from './core';

// 注册 G2 内置的 geometry
import { registerGeometry } from './chart';

import Interval from './geometry/interval';
import Line from './geometry/line';
import Path from './geometry/path';
import Polygon from './geometry/polygon';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
registerGeometry('Path', Path);
registerGeometry('Line', Line);
