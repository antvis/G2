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

// 注册 Geometry 内置的 label
import { registerGeometryLabels } from './geometry/label';
import GeometryLabels from './geometry/label/base';
import IntervalLabels from './geometry/label/interval';
import PieLabels from './geometry/label/pie';
import PolarLabels from './geometry/label/polar';

registerGeometryLabels('base', GeometryLabels);
registerGeometryLabels('interval', IntervalLabels);
registerGeometryLabels('pie', PieLabels);
registerGeometryLabels('polar', PolarLabels);

// 注册内置的 Facet
import { registerFacet } from './core';
import Rect from './facet/rect';

registerFacet('rect', Rect);

// 注册内置的 Component
import { registerComponentController } from './core';

import Annotation from './chart/controller/annotation';
import Axis from './chart/controller/axis';
import Legend from './chart/controller/legend';
import Tooltip from './chart/controller/tooltip';

// register build-in components
registerComponentController('axis', Axis);
registerComponentController('legend', Legend);
registerComponentController('tooltip', Tooltip);
registerComponentController('annotation', Annotation);

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
