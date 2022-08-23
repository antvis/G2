import { CoordinateComponent as CC } from '../runtime';
import { FisheyeYCoordinate } from '../spec';

export type FisheyeYOptions = FisheyeYCoordinate;

/**
 * FisheyeY
 */
export const FisheyeY: CC<FisheyeYOptions> = ({
  focusY = 0,
  distortionY = 2,
  isVisual = false,
}) => [['fisheye.x', focusY, distortionY, isVisual]];

FisheyeY.props = {};
