import { InferComponent as IC, InferredEncode } from '../runtime';
import { zero } from './utils';

export type MaybeZeroY1Options = Record<string, never>;

function inferEncode({ y = [zero()], ...rest }: InferredEncode) {
  return { y, ...rest };
}

/**
 * Add zero constant encode for y1 channel.
 * This is useful for point geometry.
 */
export const MaybeZeroY1: IC<MaybeZeroY1Options> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeZeroY1.props = {};
