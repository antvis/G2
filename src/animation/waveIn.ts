import { arc } from 'd3-shape';
import { Linear } from '@antv/scale';
import { convertToPath, Path } from '@antv/g';
import { G2Element, select } from '../utils/selection';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from '../spec';
import { getArcObject } from '../shape/utils';
import { isPolar } from '../utils/coordinate';
import { attributeKeys, attributeOf, effectTiming } from './utils';
import { ScaleInX } from './scaleInX';

export type WaveInOptions = Animation & {
  /** Count of keyframe animations */
  frameCount?: number;
};

/**
 * Transform mark from transparent to solid.
 */
export const WaveIn: AC<WaveInOptions> = (options) => {
  const ZERO = 0.0001;
  const { frameCount = 10 } = options;

  return (from, to, value, coordinate, defaults) => {
    const [shape] = from;

    // Animation reuse scaleInX in the cartesian coordinate.
    if (!isPolar(coordinate)) {
      ScaleInX(options)(from, to, value, coordinate, defaults);
      return shape.animate([], effectTiming(defaults, value, options));
    }

    const center = coordinate.getCenter();
    const { __data__, style } = shape as G2Element;
    const { radius = 0, transform } = style;
    const { points, y, y1 } = __data__;
    const attributes = attributeOf(shape, attributeKeys);

    const path = arc().cornerRadius(radius as number);
    const arcObject = getArcObject(coordinate, points, [y, y1]);
    const { startAngle, endAngle } = arcObject;
    const createArcPath = (arcParams) =>
      convertToPath(
        select(new Path({}))
          .style('path', path(arcParams))
          .style('transform', `translate(${center[0]}, ${center[1]})`)
          .node(),
      );

    const x = new Linear({
      domain: [0, frameCount - 1],
      range: [startAngle + ZERO, endAngle],
    });

    /**
     * TODO: Use this method of creating new Path temporarily.
     * Reason: Keyframe transform does not take effect when it has path.
     */
    const keyframes = Array.from({ length: frameCount }, (_, i) => ({
      path: createArcPath({
        ...arcObject,
        endAngle: x.map(i),
      }),
      ...attributes,
    }));

    return shape.animate(keyframes, effectTiming(defaults, value, options));
  };
};

WaveIn.props = {};
