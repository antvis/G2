import { InferComponent as IC } from '../runtime';

export type MaybeTupleOptions = {};

export const MaybeTuple: IC<MaybeTupleOptions> = () => {
  return ({ x, y, ...rest }) => ({
    ...(x !== undefined && { x: [x].flat(1) }),
    ...(y !== undefined && { y: [y].flat(1) }),
    ...rest,
  });
};

MaybeTuple.props = {};
