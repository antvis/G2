import { ParsedBaseStyleProps } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type FadeOutOptions = Animation;

/**
 * Transform mark from solid to transparent.
 */
export const FadeOut: AC<FadeOutOptions> = (options) => {
  return (shape, value, coordinate, defaults) => {
    const { fillOpacity, strokeOpacity, opacity } =
      shape.parsedStyle as ParsedBaseStyleProps;
    const keyframes = [
      {
        fillOpacity: fillOpacity.value,
        strokeOpacity: strokeOpacity.value,
        opacity: opacity.value,
      },
      { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    ];
    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

FadeOut.props = {};
