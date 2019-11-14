export * from './core';

// 注册 G2 内置的 geometry
import { registerGeometry } from './core';
import Area from './geometry/area';
import Interval from './geometry/interval';
import Line from './geometry/line';
import Path from './geometry/path';
import Point from './geometry/point';
import Polygon from './geometry/polygon';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
registerGeometry('Path', Path);
registerGeometry('Point', Point);
registerGeometry('Line', Line);
registerGeometry('Area', Area);

// 注册内置的 Facet
import { registerFacet } from './core';
import Rect from './facet/rect';

registerFacet('rect', Rect);

// 注册默认的交互行为
import { registerInteraction } from './interaction';
import Active from './interaction/active';
import ActiveRegion from './interaction/active-region';
registerInteraction('active', Active);
registerInteraction('activeRegion', ActiveRegion);
