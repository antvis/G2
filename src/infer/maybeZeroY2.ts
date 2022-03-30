import { InferComponent as IC, InferredEncode } from '../runtime';
import { zero } from './utils';

export type MaybeZeroY2Options = Record<string, never>;

function inferEncode(encode: InferredEncode) {
  const { y, ...rest } = encode;
  if (y === undefined) return encode;
  if (Array.isArray(y) && y.length >= 2) return encode;
  return { y: [...[y].flat(1), zero()], ...rest };
}

/**
 * Add zero constant encode for y2 channel.
 * This is useful for interval and area geometry.
 */
export const MaybeZeroY2: IC<MaybeZeroY2Options> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeZeroY2.props = {};
