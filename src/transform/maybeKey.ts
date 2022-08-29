import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column } from './utils/helper';

export type MaybeKeyOptions = Record<string, never>;

/**
 * Infer key for every element.
 */
export const MaybeKey: TC<MaybeKeyOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { key, ...rest } = encode;
    if (key !== undefined) return [I, mark];
    const values = Object.values(rest).map(({ value }) => value);
    const K = I.map((i) =>
      values
        .filter(Array.isArray)
        .map((V) => V[i])
        .join('-'),
    );
    return [I, deepMix({}, mark, { encode: { key: column(K) } })];
  };
};

MaybeKey.props = {};
