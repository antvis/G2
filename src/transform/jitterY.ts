import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { JitterYTransform } from '../spec';
import { column, columnOf } from './utils/helper';
import { rangeOf, interpolate } from './jitter';

export type JitterYOptions = Omit<JitterYTransform, 'type'>;

/**
 * The JitterY transform produce dy channels for marks (especially for point)
 * with ordinal x and y dimension, say to make them jitter in their own space.
 */
export const JitterY: TC<JitterYOptions> = (options = {}) => {
  const { padding = 0, random = Math.random } = options;
  return (I, mark) => {
    const { encode, scale } = mark;
    const { y: scaleY } = scale;
    const [Y] = columnOf(encode, 'y');
    const rangeY = rangeOf(Y, scaleY, padding);
    const DY = I.map(() => interpolate(random(), ...rangeY));
    return [
      I,
      deepMix({ scale: { y: { padding: 0.5 } } }, mark, {
        encode: { dy: column(DY) },
      }),
    ];
  };
};

JitterY.props = {};
