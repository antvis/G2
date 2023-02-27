import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { inferredColumn, constant } from './utils/helper';

export type MaybeZeroXOptions = Record<string, never>;

/**
 * Add zero constant encode for x channel.
 * This is useful for interval geometry.
 */
export const MaybeZeroX: TC<MaybeZeroXOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { x } = encode;
    if (x !== undefined) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        encode: { x: inferredColumn(constant(I, 0)) },
        scale: { x: { guide: null } },
      }),
    ];
  };
};

MaybeZeroX.props = {};
