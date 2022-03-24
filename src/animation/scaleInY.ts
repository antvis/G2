import { isTranspose } from '../utils/coordinate';
import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';

export type ScaleInYOptions = Animation;

/**
 * Scale mark from nothing to desired shape in y direction.
 */
export const ScaleInY: AC<ScaleInYOptions> = (options) => {
  // Small enough to hide mark,
  // But bigger enough to not cause bug.
  const ZERO = 0.0001;

  return (shape, style, coordinate, theme) => {
    const { height } = shape.getBoundingClientRect();
    const [transformOrigin, transform]: [[number, number], string] =
      isTranspose(coordinate)
        ? [[0, 0], `scale(${ZERO}, 1)`] // left-top corner
        : [[0, height], `scale(1, ${ZERO})`]; // left-bottom corner
    const keyframes = [{ transform }, { transform: 'scale(1, 1)' }];

    // Change transform origin for correct transform.
    shape.setOrigin(transformOrigin);

    const animation = shape.animate(
      keyframes,
      effectTiming(theme, style, options),
    );

    // Reset transform origin to eliminate side effect for following animations.
    animation.onfinish = () => shape.setOrigin(0, 0);

    return animation;
  };
};
