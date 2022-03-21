import { InferComponent as IC } from '../runtime';
import { zero } from './utils';

export type MaybeZeroX1Options = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroX1: IC<MaybeZeroX1Options> = () => {
  return ({ x = [zero()], ...rest }) => ({
    x,
    ...rest,
  });
};

MaybeZeroX1.props = {};
