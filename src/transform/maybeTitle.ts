import { deepMix } from '@antv/util';
import { isUnset } from '../utils/helper';
import { TransformComponent as TC } from '../runtime';
import { dynamicFormatDateTime } from '../utils/dateFormat';
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
    if (isUnset(tooltip)) return [I, mark];
    const { title } = tooltip;
    if (title !== undefined) return [I, mark];
    const titles = Object.keys(encode)
      .filter((key) => key.startsWith(channel))
      .filter((key) => !encode[key].inferred)
      .map((key) => columnOf(encode, key))
      .filter(([T]) => T)
      .map((d) => d[0]);
    if (titles.length === 0) return [I, mark];
    const T = [];
    for (const i of I) {
      T[i] = {
        value: titles
          .map((t) =>
            t[i] instanceof Date ? dynamicFormatDateTime(t[i] as Date) : t[i],
          )
          .join(', '),
      };
    }
    return [
      I,
      deepMix({}, mark, {
        tooltip: {
          title: T,
        },
      }),
    ];
  };
};

MaybeTitle.props = {};
