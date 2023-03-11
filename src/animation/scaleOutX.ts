import { isTranspose } from '../utils/coordinate';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { effectTiming } from './utils';

export type ScaleOutXOptions = Animation;

/**
 * Scale mark from desired shape to nothing in x direction.
 */
export const ScaleOutX: AC<ScaleOutXOptions> = (options) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const { height } = shape.getBoundingClientRect();
    const {
      transform: prefix = '',
      fillOpacity = 1,
      strokeOpacity = 1,
      opacity = 1,
    } = shape.style;
    const [transformOrigin, transform]: [[number, number], string] =
      isTranspose(coordinate)
        ? [[0, height], `scale(1, ${ZERO})`] // left-bottom corner
        : [[0, 0], `scale(${ZERO}, 1)`]; // left-top corner

    // Using a short fadeIn transition to hide element with scale(0.001)
    // which is still visible.
    const keyframes = [
      {
        transform: `${prefix} scale(1, 1)`.trimStart(),
      },
      {
        transform: `${prefix} ${transform}`.trimStart(),
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.99,
      },
      {
        transform: `${prefix} ${transform}`.trimStart(),
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
    ];

    // Change transform origin for correct transform.
    shape.setOrigin(transformOrigin);

    const animation = shape.animate(
      keyframes,
      effectTiming(defaults, value, options),
    );

    // Reset transform origin to eliminate side effect for following animations.
    animation.finished.then(() => shape.setOrigin(0, 0));

    return animation;
  };
};
