import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, isObject } from './utils/helper';

export type MaybeTupleOptions = Record<string, never>;

/**
 * Add 3 constant encode for size channel.
 * This is useful for point geometry.
 */
export const MaybeTuple: TC<MaybeTupleOptions> = () => {
  return (I, mark) => {
    const { data } = mark;
    if (!Array.isArray(data) || data.some(isObject)) return [I, mark];
    const position = Array.isArray(data[0]) ? data : [data];
    const X = position.map((d) => d[0]);
    const Y = position.map((d) => d[1]);
    return [I, deepMix({}, mark, { encode: { x: column(X), y: column(Y) } })];
  };
};

MaybeTuple.props = {};
