import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';

export type FadeInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const FadeIn: AC<FadeInOptions> = (options) => {
  return (from, _, defaults) => {
    const [shape] = from;
    const { fillOpacity = 1, strokeOpacity = 1, opacity = 1 } = shape.style;
    const keyframes = [
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
      {
        fillOpacity,
        strokeOpacity,
        opacity,
      },
    ];
    return shape.animate(keyframes, { ...defaults, ...options });
  };
};

FadeIn.props = {};
