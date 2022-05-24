import { TransformComponent as TC } from '../../runtime';
import { merge, applyDefaults, constant } from '../utils/helper';

export type MaybeZeroYOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroY: TC<MaybeZeroYOptions> = () => {
  return merge(({ encode }) => ({
    encode: applyDefaults(encode, { y: constant(0) }),
  }));
};

MaybeZeroY.props = {
  type: 'inference',
};
