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
    if (tooltip === null || tooltip === false) return [I, mark];
    const { title } = tooltip;
    if (title !== undefined) return [I, mark];
    const titles = Object.keys(encode)
      .filter((key) => key.startsWith(channel))
      .filter((key) => !encode[key].inferred)
      .map((key) => columnOf(encode, key))
      .filter(([T]) => T)
      .map((d) => d[0]);
    if (titles.length === 0) return [I, mark];
    return [
      I,
      deepMix({}, mark, {
        tooltip: {
          title: I.map((i) => ({ value: titles.map((t) => t[i]).join(', ') })),
        },
      }),
    ];
  };
};

MaybeTitle.props = {};
