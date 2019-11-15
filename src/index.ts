export * from './core';

import { View } from './chart/view';
import { GeometryCfg } from './geometry/base';
import { PathCfg } from './geometry/path';

// 注册 G2 内置的 geometry
import { registerGeometry } from './core';
import Area from './geometry/area';
import Interval from './geometry/interval';
import Line from './geometry/line';
import Path from './geometry/path';
import Point from './geometry/point';
import Polygon from './geometry/polygon';

// view module augmentation
// detail: http://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
declare module './chart/view' {
  interface View {
    polygon(cfg?: Partial<GeometryCfg>): Polygon;
    point(cfg?: Partial<GeometryCfg>): Point;
    interval(cfg?: Partial<GeometryCfg>): Interval;
    path(cfg?: Partial<PathCfg>): Path;
    line(cfg?: Partial<PathCfg>): Line;
    area(cfg?: Partial<PathCfg>): Area;
  }
}

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
