import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, isObject } from './utils/helper';

export type MaybeTupleXOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeTupleX: TC<MaybeTupleXOptions> = () => {
  return (I, mark) => {
    const { data } = mark;
    if (!Array.isArray(data) || data.some(isObject)) return [I, mark];
    return [I, deepMix({}, mark, { encode: { x: column(data) } })];
  };
};

MaybeTupleX.props = {};
