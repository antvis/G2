export type CoordinateTransform = TransposeCoordinate | FisheyeCoordinate;

export type CoordinateTransformTypes = 'transpose' | 'fisheye';

export type TransposeCoordinate = {
  type?: 'transpose';
};

export type FisheyeCoordinate = {
  type?: 'fisheye';
  focusX?: number;
  focusY?: number;
  distortionX?: number;
  distortionY?: number;
  visual?: boolean;
};
