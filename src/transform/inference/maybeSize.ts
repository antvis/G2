import { TransformComponent as TC } from '../../runtime';
import { merge, applyDefaults, constant } from '../utils/helper';

export type MaybeSizeOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeSize: TC<MaybeSizeOptions> = () => {
  return merge(({ encode }) => ({
    encode: applyDefaults(encode, { size: constant(3) }),
  }));
};

MaybeSize.props = {
  type: 'inference',
};
