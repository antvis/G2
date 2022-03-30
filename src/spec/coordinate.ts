import { CoordinateComponent } from '../runtime';

export type Coordinate =
  | PolarCoordinate
  | TransposeCoordinate
  | CustomCoordinate
  | CartesianCoordinate
  | ParallelCoordinate;

export type CoordinateTypes = 'polar' | 'transpose' | 'cartesian' | 'parallel';

export type PolarCoordinate = {
  type?: 'polar';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type TransposeCoordinate = {
  type?: 'transpose';
};

export type CartesianCoordinate = {
  type?: 'cartesian';
};

export type ParallelCoordinate = {
  type?: 'parallel';
};

export type CustomCoordinate = {
  type: CoordinateComponent;
  [key: string]: any;
};
