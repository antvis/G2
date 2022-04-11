import { InferComponent as IC, InferredEncode } from '../runtime';

export type MaybeTupleOptions = Record<string, never>;

function tuple(options: Record<string, unknown>, key: string) {
  const value = options[key];
  return value !== undefined && { [key]: [value].flat(1) };
}

function inferEncode(encode: InferredEncode) {
  return {
    ...encode,
    ...tuple(encode, 'y'),
    ...tuple(encode, 'x'),
    ...tuple(encode, 'tooltip'),
  };
}

/**
 * Wrap flat channel into nested array.
 * @example {x: [1, 2, 3]} -> {x: [[1], [2], [3]]}
 */
export const MaybeTuple: IC<MaybeTupleOptions> = () => {
  return ({ encode, transform }) => ({
    encode: inferEncode(encode),
    transform,
  });
};

MaybeTuple.props = {};
