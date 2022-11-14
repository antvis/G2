import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { effectTiming } from './utils';

export type FadeInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const FadeIn: AC<FadeInOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const { fillOpacity, strokeOpacity, opacity } = shape.style;

    const keyframes = [
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
      {
        fillOpacity,
        strokeOpacity,
        opacity,
      },
    ];

    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeIn.props = {};
