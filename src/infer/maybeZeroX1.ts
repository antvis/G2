import { InferComponent as IC, InferredEncode } from '../runtime';
import { zero } from './utils';

export type MaybeZeroX1Options = Record<string, never>;

function inferEncode({ x = [zero()], ...rest }: InferredEncode) {
  return { x, ...rest };
}

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroX1: IC<MaybeZeroX1Options> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeZeroX1.props = {};
