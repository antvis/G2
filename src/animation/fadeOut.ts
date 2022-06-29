import { DisplayObject } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { fadeIn } from './fadeIn';
import { effectTiming } from './utils';

export type FadeOutOptions = Animation;

export function fadeOut(shape: DisplayObject) {
  return fadeIn(shape).reverse();
}

/**
 * Transform mark from solid to transparent.
 */
export const FadeOut: AC<FadeOutOptions> = (options) => {
  return (shape, value, coordinate, defaults) => {
    return shape.animate(
      fadeOut(shape),
      effectTiming(defaults, value, options),
    );
  };
};

FadeOut.props = {};
