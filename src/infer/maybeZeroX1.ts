import { InferComponent as IC } from '../runtime';
import { zero } from './utils';

export type MaybeZeroX1Options = void;

export const MaybeZeroX1: IC<MaybeZeroX1Options> = () => {
  return ({ x = [zero()], ...rest }) => ({
    x,
    ...rest,
  });
};

MaybeZeroX1.props = {};
