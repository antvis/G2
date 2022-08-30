import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { JitterYTransform } from '../spec';
import { random } from '../utils/helper';
import { column, columnOf } from './utils/helper';
import { rangeOf } from './jitter';

export type JitterYOptions = Omit<JitterYTransform, 'type'>;

/**
 * The jitterY transform produce dy channels for marks (especially for point)
 * with ordinal x and y dimension, say to make them jitter in their own space.
 */
export const JitterY: TC<JitterYOptions> = (options = {}) => {
  const { padding = 0 } = options;
  return (I, mark) => {
    const { encode, scale } = mark;
    const { y: scaleY } = scale;
    const [Y] = columnOf(encode, 'y');
    const rangeY = rangeOf(Y, scaleY, padding);
    const DY = I.map(() => random(...rangeY));
    return [I, deepMix({}, mark, { encode: { dy: column(DY) } })];
  };
};

JitterY.props = {};
