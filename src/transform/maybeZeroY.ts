import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { inferredColumn, constant } from './utils/helper';

export type MaybeZeroYOptions = Record<string, never>;

/**
 * Add zero constant encode for y channel.
 */
export const MaybeZeroY: TC<MaybeZeroYOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { y } = encode;
    if (y !== undefined) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        encode: { y: inferredColumn(constant(I, 0)) },
        scale: { y: { guide: null } },
      }),
    ];
  };
};

MaybeZeroY.props = {};
