import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { DodgeXTransform } from '../spec';
import { column, columnOf, maybeColumnOf } from './utils/helper';
import {
  createGroups,
  normalizeComparator,
  applyOrder,
  domainOf,
} from './utils/order';

export type DodgeXOptions = Omit<DodgeXTransform, 'type'>;

/**
 * The dodge group marks into series by color or series channel,
 * and then produce new series channel for each series by specified order,
 * say to form horizontal "columns" by specified channels.
 */
export const DodgeX: TC<DodgeXOptions> = (options = {}) => {
  const { groupBy = 'x', reverse = false, orderBy, padding, ...rest } = options;
  return (I, mark) => {
    const { data, encode, scale } = mark;
    const { series: scaleSeries } = scale;
    const [Y] = columnOf(encode, 'y');
    const [S] = maybeColumnOf(encode, 'series', 'color');
    const domainSeries = domainOf(S, scaleSeries);

    // Create groups and apply specified order for each group.
    const groups = createGroups(groupBy, I, mark);
    const createComparator = normalizeComparator(orderBy);
    const comparator = createComparator(data, Y, S);
    if (comparator) applyOrder(groups, comparator);

    // Update series for each mark related to series domain.
    const newS = new Array(I.length);
    for (const G of groups) {
      if (reverse) G.reverse();
      for (let i = 0; i < G.length; i++) {
        newS[G[i]] = domainSeries[i];
      }
    }

    return [
      I,
      deepMix({}, mark, {
        scale: {
          series: {
            domain: domainSeries,
            paddingInner: padding,
          },
        },
        encode: {
          series: column(newS),
        },
      }),
    ];
  };
};

DodgeX.props = {};
