import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { DiffYTransform } from '../spec';
import { column, columnOf, maybeColumnOf } from './utils/helper';
import { createGroups } from './utils/order';

export type DiffYOptions = Omit<DiffYTransform, 'type'>;

/**
 * The DiffY transform apply offset for y0 channels.
 * Keep y unchanged, set y1 = max(otherY), if y1 > y, remove the data.
 */
export const DiffY: TC<DiffYOptions> = (options = {}) => {
  const { groupBy = 'x', series = true } = options;
  return (I, mark) => {
    const { encode } = mark;
    const [Y] = columnOf(encode, 'y');
    const [_, fy1] = columnOf(encode, 'y1');

    const [S] = series
      ? maybeColumnOf(encode, 'series', 'color')
      : columnOf(encode, 'color');

    // Create groups and apply specified order for each group.
    const groups = createGroups(groupBy, I, mark);

    // Only adjust Y1 channel.
    const newY1 = new Array(I.length);
    for (const G of groups) {
      const YG = G.map((i) => +Y[i]);
      // Process each series.
      for (let idx = 0; idx < G.length; idx++) {
        const i = G[idx];
        // Get the max Y of current group with current Y exclude.
        const max = Math.max(...YG.filter((_, _i) => _i !== idx));
        // Diff Y value.
        newY1[i] = +Y[i] > max ? max : Y[i];
      }
    }

    return [
      I,
      deepMix({}, mark, {
        encode: {
          y1: column(newY1, fy1),
        },
      }),
    ];
  };
};

DiffY.props = {};
