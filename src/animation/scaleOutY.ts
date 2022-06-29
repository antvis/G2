import { isTranspose } from '../utils/coordinate';
import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';
import { AbstractScale, transformY, directionOut } from './scaleInX';

export type ScaleOutYOptions = Animation;

/**
 * Scale mark from desired shape to nothing in y direction.
 */
export const ScaleOutY: AC<ScaleOutYOptions> = (options) => {
  return AbstractScale<ScaleOutYOptions>(directionOut, transformY, options);
};
