import { Animation } from '../spec';
import { AnimationComponent as AC } from '../runtime';
import { effectTiming } from './utils';

export type ZoomOutOptions = Animation;

export const ZoomOut: AC<ZoomOutOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const keyframes = [
      { transform: 'scale(1)' },
      { transform: 'scale(0.1)', fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
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
