import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { inferredColumn, constant } from './utils/helper';

export type MaybeZeroZOptions = Record<string, never>;

/**
 * Add zero constant encode for z channel.
 */
export const MaybeZeroZ: TC<MaybeZeroZOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { z } = encode;
    if (z !== undefined) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        encode: { z: inferredColumn(constant(I, 0)) },
        scale: { z: { guide: null } },
      }),
    ];
  };
};

MaybeZeroZ.props = {};
