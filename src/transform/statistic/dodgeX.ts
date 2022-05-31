import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../../runtime';
import { DodgeXTransform } from '../../spec';
import { column, merge } from '../utils/helper';
import {
  createGroups,
  normalizeComparator,
  applyOrder,
  domainOf,
} from './utils';

export type DodgeXOptions = Omit<DodgeXTransform, 'type'>;

/**
 * The dodge group marks into series by color or series channel,
 * and then produce new series channel for each series by specified order,
 * say to form horizontal "columns" by specified channels.
 */
export const DodgeX: TC<DodgeXOptions> = (options = {}) => {
  const { groupBy = 'x', reverse = false, orderBy, ...rest } = options;
  return merge((context) => {
    const { data, encode, columnOf, I, scale } = context;
    const { series, color, y } = encode;
    const { series: scaleSeries } = scale;
    const Y = columnOf(data, y);
    const S = columnOf(data, series || color);
    const domainSeries = domainOf(S, scaleSeries);

    // Create groups and apply specified order for each group.
    const groups = createGroups(groupBy, context);
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

    return {
      // Update the domain of series as well.
      scale: deepMix({}, scale, { series: { domain: domainSeries, ...rest } }),
      encode: {
        series: column(newS),
      },
    };
  });
};

DodgeX.props = {
  category: 'statistic',
};
