import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { AbstractScale, transformY, directionIn } from './scaleInX';

export type ScaleInYOptions = Animation;

/**
 * Scale mark from nothing to desired shape in y direction.
 */
export const ScaleInY: AC<ScaleInYOptions> = (options) => {
  return AbstractScale<ScaleInYOptions>(directionIn, transformY, options);
};
