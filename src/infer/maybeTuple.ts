import { InferComponent as IC } from '../runtime';

export type MaybeTupleOptions = Record<string, never>;

/**
 * Wrap flat x and y channel into nested array.
 * @example {x: [1, 2, 3]} -> {x: [[1], [2], [3]]}
 */
export const MaybeTuple: IC<MaybeTupleOptions> = () => {
  return ({ x, y, ...rest }) => ({
    ...(x !== undefined && { x: [x].flat(1) }),
    ...(y !== undefined && { y: [y].flat(1) }),
    ...rest,
  });
};

MaybeTuple.props = {};
