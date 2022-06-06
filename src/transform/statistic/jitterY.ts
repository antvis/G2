import { TransformComponent as TC } from '../../runtime';
import { JitterYTransform } from '../../spec';
import { merge, column } from '../utils/helper';
import { random } from '../../utils/helper';
import { rangeOf } from './jitter';

export type JitterYOptions = Omit<JitterYTransform, 'type'>;

/**
 * The jitterY transform produce dy channels for marks (especially for point)
 * with ordinal x and y dimension, say to make them jitter in their own space.
 */
export const JitterY: TC<JitterYOptions> = (options = {}) => {
  const { padding = 0 } = options;
  return merge((context) => {
    const { data, I, columnOf, encode, scale } = context;
    const { y } = encode;
    const { y: scaleY } = scale;
    const Y = columnOf(data, y);
    const rangeY = rangeOf(Y, scaleY, padding);
    const DY = I.map(() => random(...rangeY));
    return {
      encode: {
        dy: column(DY),
      },
    };
  });
};

JitterY.props = {
  category: 'statistic',
};
