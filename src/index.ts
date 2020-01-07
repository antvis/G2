export * from './core';

// register G engine
import * as CanvasEngine from '@antv/g-canvas';
import * as SVGEngine from '@antv/g-svg';
import { registerEngine } from './core';
export { registerInteraction, registerAction } from './interaction';
registerEngine('canvas', CanvasEngine);
registerEngine('svg', SVGEngine);

// 注册 G2 内置的 geometry
import { registerGeometry } from './core';
import Area from './geometry/area';
import Edge from './geometry/edge';
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
registerGeometry('Edge', Edge);

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

// 注册需要的动画执行函数
import { registerAnimation } from './animate/animation';
import { fadeIn, fadeOut } from './animate/animation/fade';
import { growInX, growInXY, growInY } from './animate/animation/grow-in';
import { scaleInX, scaleInY } from './animate/animation/scale-in';
import { sectorPathUpdate } from './animate/animation/sector-path-update';
import { textUpdate } from './animate/animation/text-update';
import { waveIn } from './animate/animation/wave-in';
import { zoomIn, zoomOut } from './animate/animation/zoom';
registerAnimation('fadeIn', fadeIn);
registerAnimation('fadeOut', fadeOut);
registerAnimation('growInX', growInX);
registerAnimation('growInXY', growInXY);
registerAnimation('growInY', growInY);
registerAnimation('scaleInX', scaleInX);
registerAnimation('scaleInY', scaleInY);
registerAnimation('waveIn', waveIn);
registerAnimation('zoomIn', zoomIn);
registerAnimation('zoomOut', zoomOut);
registerAnimation('textUpdate', textUpdate);
registerAnimation('sectorPathUpdate', sectorPathUpdate);

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

import { GeometryCfg } from './geometry/base';
import { PathCfg } from './geometry/path';

/**
 * 往 View 原型上添加的创建 Geometry 的方法
 *
 * Tips:
 * view module augmentation, detail: http://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare module './chart/view' {
  interface View {
    /**
     * 创建 Polygon 几何标记
     * @param [cfg] 传入 Polygon 构造函数的配置
     * @returns polygon 返回 Polygon 实例
     */
    polygon(cfg?: Partial<GeometryCfg>): Polygon;
    /**
     * 创建 Point 几何标记
     * @param [cfg] 传入 Point 构造函数的配置
     * @returns point 返回 Point 实例
     */
    point(cfg?: Partial<GeometryCfg>): Point;
    /**
     * 创建 Interval 几何标记
     * @param [cfg] 传入 Interval 构造函数的配置
     * @returns interval 返回 Interval 实例
     */
    interval(cfg?: Partial<GeometryCfg>): Interval;
    /**
     * 创建 Schema 几何标记
     * @param [cfg] 传入 Schema 构造函数的配置
     * @returns schema 返回 Schema 实例
     */
    schema(cfg?: Partial<GeometryCfg>): Schema;
    /**
     * 创建 Path 几何标记
     * @param [cfg] 传入 Path 构造函数的配置
     * @returns path 返回 Path 实例
     */
    path(cfg?: Partial<PathCfg>): Path;
    /**
     * 创建 Line 几何标记
     * @param [cfg] 传入 Line 构造函数的配置
     * @returns line 返回 Line 实例
     */
    line(cfg?: Partial<PathCfg>): Line;
    /**
     * 创建 Area 几何标记
     * @param [cfg] 传入 Area 构造函数的配置
     * @returns area 返回 Area 实例
     */
    area(cfg?: Partial<PathCfg>): Area;
    /**
     * 创建 Edge 几何标记
     * @param [cfg] 传入 Edge 构造函数的配置
     * @returns schema 返回 Edge 实例
     */
    edge(cfg?: Partial<GeometryCfg>): Edge;
  }
}
