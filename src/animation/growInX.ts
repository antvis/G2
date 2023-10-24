import { Path } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { ScaleInX } from './scaleInX';

export type GrowInXOptions = Animation;

/**
 * Scale mark from nothing to desired shape in x direction.
 */
export const GrowInX: AC<GrowInXOptions> = (options, context) => {
  return (from, to, defaults) => {
    const [shape] = from;
    const { height, width } = shape.getBoundingClientRect();
    const clipPath = new Path({
      style: {
        path: `M0,0L${width},0L${width},${height}L0,${height}Z`,
      },
    });
    shape.appendChild(clipPath);
    shape.style.clipPath = clipPath;

    const animation = ScaleInX(options, context)([clipPath], to, defaults);

    return animation;
  };
};

GrowInX.props = {};
