import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeIdentityYOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeIdentityY: TC<MaybeIdentityYOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { y1 } = encode;
    if (y1) return [I, mark];
    const [Y] = columnOf(encode, 'y');
    return [I, deepMix({}, mark, { encode: { y1: column([...Y]) } })];
  };
};

MaybeIdentityY.props = {};
