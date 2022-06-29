import { DisplayObject } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { effectTiming } from './utils';

export type FadeInOptions = Animation;

/**
 * @todo shape.animate() can not process `opacity = ""`;
 * When G's bug fixed, modify to `shape.style`.
 */
export function fadeIn(shape: DisplayObject) {
  const { fillOpacity, strokeOpacity, opacity } = shape.parsedStyle;
  return [
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
    {
      fillOpacity: fillOpacity.value,
      strokeOpacity: strokeOpacity.value,
      opacity: opacity.value,
    },
  ];
}

/**
 * Transform mark from transparent to solid.
 */
export const FadeIn: AC<FadeInOptions> = (options) => {
  return (shape, value, coordinate, defaults) => {
    return shape.animate(fadeIn(shape), effectTiming(defaults, value, options));
  };
};

FadeIn.props = {};
