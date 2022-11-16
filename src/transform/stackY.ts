import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { StackYTransform } from '../spec';
import { column, columnOf, maybeColumnOf } from './utils/helper';
import { normalizeComparator, createGroups, applyOrder } from './utils/order';

export type StackYOptions = Omit<StackYTransform, 'type'>;

/**
 * The stack transform group marks into series by color channel,
 * and then produce new y channel for each series by specified order,
 * say to form vertical "stacks" by specified channels.
 */
export const StackY: TC<StackYOptions> = (options = {}) => {
  const {
    groupBy = 'x',
    orderBy = null,
    reverse = false,
    y: fromY = 'y',
    y1: fromY1 = 'y1',
    series = true,
  } = options;
  return (I, mark) => {
    const { data, encode, style = {} } = mark;
    const [Y, fy] = columnOf(encode, 'y');
    const [Y1, fy1] = columnOf(encode, 'y1');
    const [S] = series
      ? maybeColumnOf(encode, 'series', 'color')
      : columnOf(encode, 'color');

    // Create groups and apply specified order for each group.
    const groups = createGroups(groupBy, I, mark);
    const createComparator = normalizeComparator(orderBy);
    const comparator = createComparator(data, Y, S);
    if (comparator) applyOrder(groups, comparator);

    // Stack y channels to produce new y and y1 channel.
    const newY = new Array(I.length);
    const newY1 = new Array(I.length);
    const TY = new Array(I.length);
    for (const G of groups) {
      if (reverse) G.reverse();
      // For range interval with specified y and y1.
      const start = Y1 ? +Y1[G[0]] : 0;

      // Split positive indices of Y and negative Y.
      const PG = [];
      const NG = [];
      for (const i of G) {
        const y = (TY[i] = +Y[i] - start);
        if (y < 0) NG.push(i);
        else if (y >= 0) PG.push(i);
      }

      // Stack negative y in reverse order.
      let ny = start;
      for (const i of NG.reverse()) {
        const y = TY[i];
        ny = newY[i] = (newY1[i] = ny) + y;
      }

      // Stack positive y in input order.
      let py = start;
      for (const i of PG) {
        const y = TY[i];
        if (y > 0) py = newY[i] = (newY1[i] = py) + y;
        else newY[i] = newY1[i] = py;
      }
    }

    // Only set top radius for the first layer,
    // and set bottom radius for the last layer.
    const F = new Set(groups.map((G) => G[G.length - 1]));
    const L = new Set(groups.map((G) => G[0]));

    // Choose new y or y1 channel as the new y channel.
    const V = fromY === 'y' ? newY : newY1;
    const V1 = fromY1 === 'y' ? newY : newY1;
    return [
      I,
      deepMix({}, mark, {
        encode: {
          y: column(V, fy),
          y1: column(V1, fy1),
        },
        style: {
          first: (_, i) => F.has(i),
          last: (_, i) => L.has(i),
          ...style,
        },
      }),
    ];
  };
};

StackY.props = {};
