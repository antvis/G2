import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type FadeInYOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const FadeIn: AC<FadeInYOptions> = (options) => {
  return (shape, value, coordinate, defaults) => {
    const { fillOpacity = 1, strokeOpacity = 1, opacity = 1 } = shape.style;
    const keyframes = [
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
      { fillOpacity, strokeOpacity, opacity },
    ];
    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeIn.props = {};
