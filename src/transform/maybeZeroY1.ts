import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { inferredColumn, constant } from './utils/helper';

export type MaybeZeroY1Options = Record<string, never>;

/**
 * Add zero constant encode for y1 channel.
 */
export const MaybeZeroY1: TC<MaybeZeroY1Options> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { y1 } = encode;
    if (y1 !== undefined) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        encode: { y1: inferredColumn(constant(I, 0)) },
      }),
    ];
  };
};

MaybeZeroY1.props = {};
