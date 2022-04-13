import { CoordinateComponent as CC } from '../runtime';
import { FisheyeCoordinate } from '../spec';

export type FisheyeOptions = Omit<FisheyeCoordinate, 'polar'>;

/**
 * Fisheye
 */
export const Fisheye: CC<FisheyeOptions> = ({
  focusX = 0,
  focusY = 0,
  distortionX = 2,
  distortionY = 2,
}) => [['fisheye', focusX, focusY, distortionX, distortionY]];

Fisheye.props = {};
