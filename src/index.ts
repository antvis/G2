export * from './core';

// register G engine
import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { registerEngine } from './core';
registerEngine('canvas', CanvasEngine);
registerEngine('svg', SVGEngine);

// 注册 G2 内置的 geometry
import { registerGeometry } from './core';
import Area from './geometry/area';
import Interval from './geometry/interval';
import Line from './geometry/line';
import Path from './geometry/path';
import Point from './geometry/point';
import Polygon from './geometry/polygon';
import Schema from './geometry/schema';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
registerGeometry('Schema', Schema);
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

// view module augmentation
// detail: http://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import { GeometryCfg } from './geometry/base';
import { PathCfg } from './geometry/path';

declare module './chart/view' {
  interface View {
    polygon(cfg?: Partial<GeometryCfg>): Polygon;
    point(cfg?: Partial<GeometryCfg>): Point;
    interval(cfg?: Partial<GeometryCfg>): Interval;
    schema(cfg?: Partial<GeometryCfg>): Schema;
    path(cfg?: Partial<PathCfg>): Path;
    line(cfg?: Partial<PathCfg>): Line;
    area(cfg?: Partial<PathCfg>): Area;
  }
}
