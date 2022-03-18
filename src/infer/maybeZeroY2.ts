import { InferComponent as IC } from '../runtime';
import { zero } from './utils';

export type MaybeZeroY2Options = {};

export const MaybeZeroY2: IC<MaybeZeroY2Options> = () => {
  return (encodings) => {
    const { y, ...rest } = encodings;
    if (y === undefined) return encodings;
    if (Array.isArray(y) && y.length >= 2) return encodings;
    return { y: [...[y].flat(1), zero()], ...rest };
  };
};

MaybeZeroY2.props = {};
