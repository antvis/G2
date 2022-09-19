import { deepMix } from '@antv/util';
import { groupSort, max, min, sum } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { SortXTransform } from '../spec';
import { columnOf } from './utils/helper';

function createReducer(options, encode): (I: number[]) => any {
  const { channel = 'y', reducer = 'max' } = options;
  const [V] = columnOf(encode, channel);
  if (typeof reducer === 'function') return (GI: number[]) => reducer(GI, V);
  if (reducer === 'max') return (GI: number[]) => max(GI, (i) => +V[i]);
  if (reducer === 'min') return (GI: number[]) => min(GI, (i) => +V[i]);
  if (reducer === 'sum') return (GI: number[]) => sum(GI, (i) => +V[i]);
  if (reducer === 'first') return (GI: number[]) => V[GI[0]];
  if (reducer === 'last') return (GI: number[]) => V[GI[GI.length - 1]];
  throw new Error(`Unknown reducer: ${reducer}`);
}

export type SortXOptions = Omit<SortXTransform, 'type'>;

/**
 * Sort marks groups by groups.
 * @todo Add more reducers: first, last, etc,.
 */
export const SortX: TC<SortXOptions> = (options = {}) => {
  const { reverse = false, slice, ...rest } = options;
  return (I, mark) => {
    const { encode } = mark;
    const [X] = columnOf(encode, 'x');
    const normalizeReducer = createReducer(rest, encode);
    const sortedDomain = groupSort(I, normalizeReducer, (i) => X[i]);
    if (reverse) sortedDomain.reverse();
    const s = typeof slice === 'number' ? [0, slice] : slice;
    const slicedDomain = slice ? sortedDomain.slice(...s) : sortedDomain;
    return [
      I,
      deepMix(mark, {
        scale: {
          x: {
            domain: slicedDomain,
          },
        },
      }),
    ];
  };
};

SortX.props = {};
