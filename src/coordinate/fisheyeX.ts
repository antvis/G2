import { CoordinateComponent as CC } from '../runtime';
import { FisheyeXCoordinate } from '../spec';

export type FisheyeXOptions = FisheyeXCoordinate;

/**
 * FisheyeX
 */
export const FisheyeX: CC<FisheyeXOptions> = ({
  focusX = 0,
  distortionX = 2,
  isVisual = false,
}) => [['fisheye.x', focusX, distortionX, isVisual]];

FisheyeX.props = {};
