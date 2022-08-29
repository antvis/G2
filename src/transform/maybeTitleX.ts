import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeTitleXOptions = Record<string, never>;

/**
 * Infer title channel from x-position channel.
 */
export const MaybeTitleX: TC<MaybeTitleXOptions> = () => {
  return (I, mark) => {
    const { encode } = mark;
    const { title } = encode;
    if (title !== undefined) return [I, mark];
    const [X, fx] = columnOf(encode, 'x');
    return [I, deepMix({}, mark, { encode: { title: column(X, fx) } })];
  };
};

MaybeTitleX.props = {};
