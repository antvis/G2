import { CoordinateComponent as CC } from '../runtime';
import { FisheyeCoordinate } from '../spec';

export type FisheyeOptions = FisheyeCoordinate;

/**
 * Fisheye
 */
export const Fisheye: CC<FisheyeOptions> = ({
  focusX = 0,
  focusY = 0,
  distortionX = 2,
  distortionY = 2,
  isVisual = false,
}) => [['fisheye', focusX, focusY, distortionX, distortionY, isVisual]];

Fisheye.props = { transform: true };
