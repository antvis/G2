import { deepMix } from '@antv/util';
import { mean, deviation, median, sum, max, min } from 'd3-array';
import { isUnset } from '../utils/helper';
import { TransformComponent as TC } from '../runtime';
import { NormalizeYTransform } from '../spec';
import { column, columnOf } from './utils/helper';
import { createGroups } from './utils/order';

export type NormalizeYOptions = Omit<NormalizeYTransform, 'type'>;

function normalizeBasis(basis: NormalizeYOptions['basis']) {
  if (typeof basis === 'function') return basis;
  const registry = {
    min: (I, Y) => min(I, (i) => Y[+i]),
    max: (I, Y) => max(I, (i) => Y[+i]),
    first: (I, Y) => Y[I[0]],
    last: (I, Y) => Y[I[I.length - 1]],
    mean: (I, Y) => mean(I, (i) => Y[+i]),
    median: (I, Y) => median(I, (i) => Y[+i]),
    sum: (I, Y) => sum(I, (i) => Y[+i]),
    deviation: (I, Y) => deviation(I, (i) => Y[+i]),
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
  return (I, mark) => {
    const { encode, tooltip } = mark;
    const { x, ...rest } = encode;

    // Extract and create new channels starts with y, such as y, y1.
    const Yn = Object.entries(rest)
      .filter(([k]) => k.startsWith('y'))
      .map(([k]) => [k, columnOf(encode, k)[0]] as const);
    const [, Y] = Yn.find(([k]) => k === 'y');
    const newYn = Yn.map(([k]) => [k, new Array(I.length)] as const);

    // Group marks into series by specified keys.
    const groups = createGroups(groupBy, I, mark);

    // Transform y channels for each group based on basis.
    const basisFunction = normalizeBasis(basis);
    for (const I of groups) {
      // Compute basis only base on y.
      const basisValue = basisFunction(I, Y);
      for (const i of I) {
        for (let j = 0; j < Yn.length; j++) {
          const [, V] = Yn[j];
          const [, newV] = newYn[j];
          newV[i] = +V[i] / basisValue;
        }
      }
    }

    const specifiedTooltip =
      isUnset(tooltip) || (tooltip?.items && tooltip?.items.length !== 0);
    return [
      I,
      deepMix({}, mark, {
        encode: Object.fromEntries(
          newYn.map(([k, v]) => [k, column(v, columnOf(encode, k)[1])]),
        ),
        // Infer tooltip item.
        ...(!specifiedTooltip &&
          encode.y0 && {
            tooltip: { items: [{ channel: 'y0' }] },
          }),
      }),
    ];
  };
};

NormalizeY.props = {};
