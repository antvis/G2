import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { StackYTransform } from '../spec';
import { column, columnOf, maybeColumnOf } from './utils/helper';
import { normalizeComparator, createGroups, applyOrder } from './utils/order';

export type StackYOptions = Omit<StackYTransform, 'type'>;

/**
 * The stack transform group marks into series by color or series channel,
 * and then produce new y channel for each series by specified order,
 * say to form vertical "stacks" by specified channels.
 */
export const StackY: TC<StackYOptions> = (options = {}) => {
  const { groupBy = 'x', orderBy, reverse = false, y: from = 'y' } = options;
  return (I, mark, context) => {
    const { data, encode } = mark;
    const [Y, fy] = columnOf(encode, 'y');
    const [Y1, fy1] = columnOf(encode, 'y1');
    const [S] = maybeColumnOf(encode, 'series', 'color');

    // Create groups and apply specified order for each group.
    const groups = createGroups(groupBy, I, mark);
    const createComparator = normalizeComparator(orderBy);
    const comparator = createComparator(data, Y, S);
    if (comparator) applyOrder(groups, comparator);

    // Stack y channels to produce new y and y1 channel.
    const newY = new Array(I.length);
    const newY1 = new Array(I.length);
    for (const G of groups) {
      if (reverse) G.reverse();
      // For range interval with specified y and y1.
      const start = Y1 ? +Y1[G[0]] : 0;
      let py = start; // Positive y for next y to stack on.
      let ny = start; // Negative y for next y to stack on.
      for (const i of G) {
        const y = +Y[i] - start;
        if (y < 0) ny = newY[i] = (newY1[i] = ny) + y;
        else if (y > 0) py = newY[i] = (newY1[i] = py) + y;
        else newY[i] = newY1[i] = py;
      }
    }

    // Choose new y or y1 channel as the new y channel.
    const V = from === 'y' ? newY : newY1;
    return [
      I,
      deepMix({}, mark, {
        encode: {
          y: column(V, fy),
          y1: column(newY1, fy1),
        },
      }),
    ];
  };
};

StackY.props = {};
