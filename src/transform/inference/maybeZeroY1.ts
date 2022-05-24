import { TransformComponent as TC } from '../../runtime';
import { merge, applyDefaults, constant } from '../utils/helper';

export type MaybeZeroY1Options = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroY1: TC<MaybeZeroY1Options> = () => {
  return merge(({ encode }) => ({
    encode: applyDefaults(encode, { y1: constant(0) }),
  }));
};

MaybeZeroY1.props = {
  type: 'inference',
};
