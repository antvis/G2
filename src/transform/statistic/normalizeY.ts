import { mean, extent, deviation, median, sum, max, min } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { NormalizeYTransform } from '../../spec';
import { merge, column, field } from '../utils/helper';
import { createGroups } from './utils';

export type NormalizeYOptions = Omit<NormalizeYTransform, 'type'>;

function normalizeBasis(basis: NormalizeYOptions['basis']) {
  const registry = {
    min,
    max,
    first: (d) => d[0],
    last: (d) => d[d.length - 1],
    mean,
    extent,
    median,
    sum,
    deviation,
  };
  return registry[basis] || max;
}

/**
 * Group marks into series by specified channels, and then transform
 * each series's value, say to transform them relative to some basis
 * to apply a moving average.
 */
export const NormalizeY: TC<NormalizeYOptions> = (options = {}) => {
  const { groupBy = 'x', basis = 'max' } = options;
  return merge((context) => {
    const { data, encode, columnOf, I } = context;
    const { x, series, ...rest } = encode;

    // Extract and create new channels starts with y, such as y, y1.
    const Yn = Object.entries(rest)
      .filter(([k]) => k.startsWith('y'))
      .map(([k, encode]) => [k, columnOf(data, encode)] as const);
    const newYn = Yn.map(([k, V]) => {
      const newV = new Array(I.length);
      return [k, field(newV, V)] as const;
    });

    // Group marks into series by specified keys.
    const groups = createGroups(groupBy, context);

    // Transform y channels for each group based on basis.
    const basisFunction = normalizeBasis(basis);
    for (const I of groups) {
      const Y = I.flatMap((i) => Yn.map(([, V]) => +V[i]));
      const basisValue = basisFunction(Y);
      for (const i of I) {
        for (let j = 0; j < Yn.length; j++) {
          const [, V] = Yn[j];
          const [, newV] = newYn[j];
          newV[i] = +V[i] / basisValue;
        }
      }
    }

    return {
      encode: Object.fromEntries(newYn.map(([k, v]) => [k, column(v)])),
    };
  });
};

NormalizeY.props = {
  category: 'statistic',
};
