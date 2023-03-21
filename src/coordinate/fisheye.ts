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
  visual = false,
}) => [['fisheye', focusX, focusY, distortionX, distortionY, visual]];

Fisheye.props = { transform: true };
