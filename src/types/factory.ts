import type { Coordinate } from './coordinate';
import { Point } from './common';
import { PathCommand, Shape } from './g';
import { ShapeInfo } from './geometry';

/**
 * shape renderer 的信息
 */
export type ShapeRenderer = {
  geometry: string;
  shapeType: string;
  coordinate: Coordinate;
  parsePath: (path: string) => PathCommand[];
  parsePoint: (point: Point) => Point;
  parsePoints: (points: Point[]) => Point[];
  draw: (cfg: ShapeInfo, container: Shape) => void;
};

/**
 * 自定义 shape 的参数信息
 */
export type RegisterShapeRenderer = Partial<ShapeRenderer>;
