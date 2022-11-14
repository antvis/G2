import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { effectTiming } from './utils';

export type FadeOutOptions = Animation;

/**
 * Transform mark from solid to transparent.
 */
export const FadeOut: AC<FadeOutOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const { fillOpacity, strokeOpacity, opacity } = shape.style;
    const keyframes = [
      {
        fillOpacity,
        strokeOpacity,
        opacity,
      },
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    ];
    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeOut.props = {};
