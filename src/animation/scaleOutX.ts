import { isTranspose } from '../utils/coordinate';
import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';
import { AbstractScale, transformX, directionOut } from './scaleInX';

export type ScaleOutXOptions = Animation;

/**
 * Scale mark from desired shape to nothing in x direction.
 */
export const ScaleOutX: AC<ScaleOutXOptions> = (options) => {
  return AbstractScale<ScaleOutXOptions>(directionOut, transformX, options);
};
