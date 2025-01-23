import { CoordinateComponent } from '../runtime';
import { CoordinateTransform } from './coordinateTransform';

export type Coordinate =
  | PolarCoordinate
  | HelixCoordinate
  | ThetaCoordinate
  | CustomCoordinate
  | CartesianCoordinate
  | ParallelCoordinate
  | RadialCoordinate
  | RadarCoordinate
  | GeoCoordinate;

export type CoordinateTypes =
  | 'polar'
  | 'helix'
  | 'transpose'
  | 'theta'
  | 'cartesian'
  | 'cartesian3D'
  | 'parallel'
  | 'fisheye'
  | 'radial'
  | 'radar'
  | string;

export type BaseCoordinate<T> = T & { transform?: CoordinateTransform[] };

export type PolarCoordinate = BaseCoordinate<{
  type?: 'polar';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}>;

export type HelixCoordinate = BaseCoordinate<{
  type?: 'helix';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}>;

export type RadarCoordinate = BaseCoordinate<{
  type?: 'radar';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}>;

export type ThetaCoordinate = BaseCoordinate<{
  type?: 'theta';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}>;

export type RadialCoordinate = BaseCoordinate<{
  type?: 'radial';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
}>;

export type CartesianCoordinate = BaseCoordinate<{
  type?: 'cartesian';
}>;

export type ParallelCoordinate = BaseCoordinate<{
  type?: 'parallel';
}>;

export type GeoCoordinate = BaseCoordinate<{
  type: string;
  [key: string]: any; // @todo d3-geo types
}>;

export type CustomCoordinate = BaseCoordinate<{
  type: CoordinateComponent;
  [key: string]: any;
}>;
