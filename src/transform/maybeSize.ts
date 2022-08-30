import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { constant, visualColumn } from './utils/helper';

export type MaybeSizeOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeSize: TC<MaybeSizeOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { size } = encode;
    if (size !== undefined) return [I, mark];
    return [
      I,
      deepMix({}, mark, { encode: { size: visualColumn(constant(I, 3)) } }),
    ];
  };
};

MaybeSize.props = {};
