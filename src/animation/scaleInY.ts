import { isTranspose } from '../utils/coordinate';
import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';

export type ScaleInYOptions = Animation;

/**
 * Scale mark from nothing to desired shape in y direction.
 */
export const ScaleInY: AC<ScaleInYOptions> = (options) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  return (shape, value, coordinate, defaults) => {
    const { height } = shape.getBoundingClientRect();
    const { transform: prefix } = shape.style;
    const { fillOpacity, strokeOpacity, opacity } = shape.parsedStyle;
    const [transformOrigin, transform]: [[number, number], string] =
      isTranspose(coordinate)
        ? [[0, 0], `scale(${ZERO}, 1)`] // left-top corner
        : [[0, height], `scale(1, ${ZERO})`]; // left-bottom corner

    // Using a short fadeIn transition to hide element with scale(0.001)
    // which is still visible.
    const keyframes = [
      {
        transform: `${prefix} ${transform}`.trimStart(),
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
      {
        transform: `${prefix} ${transform}`.trimStart(),
        fillOpacity: fillOpacity.value,
        strokeOpacity: strokeOpacity.value,
        opacity: opacity.value,
        offset: 0.01,
      },
      {
        transform: `${prefix} scale(1, 1)`.trimStart(),
      },
    ];

    // Change transform origin for correct transform.
    shape.setOrigin(transformOrigin);

    const animation = shape.animate(
      keyframes,
      effectTiming(defaults, value, options),
    );

    // Reset transform origin to eliminate side effect for following animations.
    animation.onfinish = () => shape.setOrigin(0, 0);

    return animation;
  };
};
