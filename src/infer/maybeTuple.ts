import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeTupleOptions = Record<string, never>;

function inferEncode({ x, y, ...rest }: InferredEncode) {
  return {
    ...(x !== undefined && { x: [x].flat(1) }),
    ...(y !== undefined && { y: [y].flat(1) }),
    ...rest,
  };
}

/**
 * Wrap flat x and y channel into nested array.
 * @example {x: [1, 2, 3]} -> {x: [[1], [2], [3]]}
 */
export const MaybeTuple: IC<MaybeTupleOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeTuple.props = {};
