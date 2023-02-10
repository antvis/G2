import { CoordinateComponent } from '../runtime';

export type Coordinate =
  | PolarCoordinate
  | HelixCoordinate
  | TransposeCoordinate
  | ThetaCoordinate
  | CustomCoordinate
  | CartesianCoordinate
  | ParallelCoordinate
  | FisheyeCoordinate
  | RadialCoordinate
  | RadarCoordinate;

export type CoordinateTypes =
  | 'polar'
  | 'helix'
  | 'transpose'
  | 'theta'
  | 'cartesian'
  | 'parallel'
  | 'fisheye'
  | 'radial'
  | 'radar';

export type CoordinateTransform = TransposeCoordinate | FisheyeCoordinate;

export type CoordinateTransformTypes = 'transpose' | 'fisheye';

export type PolarCoordinate = {
  type?: 'polar';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type HelixCoordinate = {
  type?: 'helix';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type RadarCoordinate = {
  type?: 'radar';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type ThetaCoordinate = {
  type?: 'theta';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type RadialCoordinate = {
  type?: 'radial';
  startAngle?: number;
  endAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
};

export type CartesianCoordinate = {
  type?: 'cartesian';
};

export type ParallelCoordinate = {
  type?: 'parallel';
};

export type TransposeCoordinate = {
  type?: 'transpose';
};

export type FisheyeCoordinate = {
  type?: 'fisheye';
  focusX?: number;
  focusY?: number;
  distortionX?: number;
  distortionY?: number;
  isVisual?: boolean;
};

export type CustomCoordinate = {
  type: CoordinateComponent;
  [key: string]: any;
};
