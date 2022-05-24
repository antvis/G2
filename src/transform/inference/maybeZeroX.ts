import { TransformComponent as TC } from '../../runtime';
import { merge, applyDefaults, constant } from '../utils/helper';

export type MaybeZeroXOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroX: TC<MaybeZeroXOptions> = () => {
  return merge(({ encode }) => ({
    encode: applyDefaults(encode, { x: constant(0) }),
  }));
};

MaybeZeroX.props = {
  category: 'inference',
};
