import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { effectTiming } from './utils';

export type ZoomOutOptions = Animation;

export const ZoomOut: AC<ZoomOutOptions> = (options) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const {
      transform: prefix = '',
      fillOpacity = 1,
      strokeOpacity = 1,
      opacity = 1,
    } = shape.style;
    const keyframes = [
      { transform: `${prefix} scale(1)`.trimStart() },
      {
        transform: `${prefix} scale(${ZERO})`.trimStart(),
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.99,
      },
      {
        transform: `${prefix} scale(${ZERO})`.trimStart(),
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
    ];

    const { width, height } = shape.getBoundingClientRect();
    // Change transform origin for correct transform.
    shape.setOrigin([width / 2, height / 2]);
    const animation = shape.animate(
      keyframes,
      effectTiming(defaults, value, options),
    );

    // Reset transform origin to eliminate side effect for following animations.
    animation.finished.then(() => shape.setOrigin(0, 0));

    return animation;
  };
};
