import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';

export type ZoomInOptions = Animation;

export const ZoomIn: AC<ZoomInOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const keyframes = [
      {
        transform: 'scale(0.1)',
      },
      {
        transform: 'scale(1)',
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
