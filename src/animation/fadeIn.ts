import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type FadeInOptions = Animation;

/**
 * Transform mark from transparent to solid.
 */
export const FadeIn: AC<FadeInOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    // shape.animate() can not process `opacity = ""`;
    // todo: When G's bug fixed, modify to `shape.style`.
    const { fillOpacity, strokeOpacity, opacity } = shape.parsedStyle;

    const keyframes = [
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
      {
        fillOpacity: fillOpacity.value,
        strokeOpacity: strokeOpacity.value,
        opacity: opacity.value,
      },
    ];

    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeIn.props = {};
