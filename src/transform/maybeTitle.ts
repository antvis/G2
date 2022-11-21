import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { column, columnOf } from './utils/helper';

export type MaybeTitleOptions = {
  channel?: string;
};

/**
 * Infer title channel from x-position channel.
 */
export const MaybeTitle: TC<MaybeTitleOptions> = (options = {}) => {
  const { channel = 'x' } = options;
  return (I, mark) => {
    const { encode } = mark;
    const { title } = encode;
    if (title !== undefined) return [I, mark];
    const [T, ft] = columnOf(encode, channel);
    return [I, deepMix({}, mark, { encode: { title: column(T, ft) } })];
  };
};

MaybeTitle.props = {};
