import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type FadeOutYOptions = Animation;

/**
 * Transform mark from solid to transparent.
 */
export const FadeOut: AC<FadeOutYOptions> = (options) => {
  return (shape, value, coordinate, defaults) => {
    const { fillOpacity = 1, strokeOpacity = 1, opacity = 1 } = shape.style;
    const keyframes = [
      { fillOpacity, strokeOpacity, opacity },
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    ];
    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeOut.props = {};
