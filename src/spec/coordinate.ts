import { CoordinateComponent } from '../runtime';

export type Coordinate =
  | PolarCoordinate
  | HelixCoordinate
  | TransposeCoordinate
  | ThetaCoordinate
  | ReflectCoordinate
  | ReflectXCoordinate
  | ReflectYCoordinate
  | CustomCoordinate
  | CartesianCoordinate
  | ParallelCoordinate
  | FisheyeCoordinate
  | FisheyeXCoordinate
  | FisheyeYCoordinate
  | FisheyeCircularCoordinate;

export type CoordinateTypes =
  | 'polar'
  | 'helix'
  | 'transpose'
  | 'theta'
  | 'reflect'
  | 'reflectX'
  | 'reflectY'
  | 'cartesian'
  | 'parallel'
  | 'fisheye'
  | 'fisheyeX'
  | 'fisheyeY'
  | 'fisheyeCircular';

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

export type ReflectCoordinate = {
  type?: 'reflect';
};

export type ReflectXCoordinate = {
  type?: 'reflect.x';
};

export type ReflectYCoordinate = {
  type?: 'reflect.y';
};

export type TransposeCoordinate = {
  type?: 'transpose';
};

export type ThetaCoordinate = {
  type?: 'theta';
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

export type FisheyeCoordinate = {
  type?: 'fisheye';
  focusX?: number;
  focusY?: number;
  distortionX?: number;
  distortionY?: number;
  isVisual?: boolean;
};
export type FisheyeXCoordinate = {
  type?: 'fisheye.x';
  focusX?: number;
  distortionX?: number;
  isVisual?: boolean;
};
export type FisheyeYCoordinate = {
  type?: 'fisheye.y';
  focusY?: number;
  distortionY?: number;
  isVisual?: boolean;
};
export type FisheyeCircularCoordinate = {
  type?: 'fisheye.circular';
  focusX?: number;
  focusY?: number;
  radius?: number;
  distortion?: number;
  isVisual?: boolean;
};
export type CustomCoordinate = {
  type: CoordinateComponent;
  [key: string]: any;
};
