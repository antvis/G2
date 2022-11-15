import { IAnimation, Path } from '@antv/g';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';
import { ScaleInX } from './scaleInX';

export type GrowInXOptions = Animation;

/**
 * Scale mark from nothing to desired shape in x direction.
 */
export const GrowInX: AC<GrowInXOptions> = (options) => {
  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;
    const { height, width } = shape.getBoundingClientRect();
    const clipPath = new Path({
      style: {
        path: `M0,0L${width},0L${width},${height}L0,${height}Z`,
      },
    });
    shape.appendChild(clipPath);
    shape.style.clipPath = clipPath;

    const animation = ScaleInX(options)(
      [clipPath],
      to,
      value,
      coordinate,
      defaults,
    );

    (animation as IAnimation).finished.then(() => {
      clipPath.remove();
      shape.style.clipPath = null;
    });

    return animation;
  };
};

GrowInX.props = {};
