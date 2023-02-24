import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { columnOf } from './utils/helper';

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
    const { tooltip } = mark;
    if (tooltip === null) return [I, mark];
    const { title } = tooltip;
    if (title !== undefined) return [I, mark];
    const [T, ft] = columnOf(encode, channel);
    if (!T) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        tooltip: { title: T.map((d) => ({ value: d, name: ft })) },
      }),
    ];
  };
};

MaybeTitle.props = {};
