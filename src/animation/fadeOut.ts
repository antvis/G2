import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';

export type FadeOutOptions = Animation;

/**
 * Transform mark from solid to transparent.
 */
export const FadeOut: AC<FadeOutOptions> = (options) => {
  return (from, _, defaults) => {
    const [shape] = from;
    const { fillOpacity = 1, strokeOpacity = 1, opacity = 1 } = shape.style;
    const keyframes = [
      {
        fillOpacity,
        strokeOpacity,
        opacity,
      },
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    ];
    return shape.animate(keyframes, { ...defaults, ...options });
  };
};

FadeOut.props = {};
