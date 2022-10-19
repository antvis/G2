import { deepMix } from '@antv/util';
import { Primitive, groupSort, max, min, sum, mean, median } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { columnOf } from './utils/helper';

function createReducer(channel, options, encode): (I: number[]) => any {
  const { by = channel, reducer = 'max' } = options;
  const [V] = columnOf(encode, by);
  if (typeof reducer === 'function') return (GI: number[]) => reducer(GI, V);
  if (reducer === 'max') return (GI: number[]) => max(GI, (i) => +V[i]);
  if (reducer === 'min') return (GI: number[]) => min(GI, (i) => +V[i]);
  if (reducer === 'sum') return (GI: number[]) => sum(GI, (i) => +V[i]);
  if (reducer === 'median') return (GI: number[]) => median(GI, (i) => +V[i]);
  if (reducer === 'mean') return (GI: number[]) => mean(GI, (i) => +V[i]);
  if (reducer === 'first') return (GI: number[]) => V[GI[0]];
  if (reducer === 'last') return (GI: number[]) => V[GI[GI.length - 1]];
  throw new Error(`Unknown reducer: ${reducer}`);
}

export type SortOptions = {
  by?: string;
  reverse?: boolean;
  channel?: string;
  slice?: number | [number, number];
  reducer?:
    | 'max'
    | 'min'
    | 'sum'
    | 'first'
    | 'last'
    | 'mean'
    | 'median'
    | ((I: number[], V: Primitive[]) => Primitive);
};

/**
 * Sort marks groups by groups.
 * @todo Add more reducers: first, last, etc,.
 */
export const Sort: TC<SortOptions> = (options = {}) => {
  const { reverse = false, slice, channel, ...rest } = options;
  return (I, mark) => {
    const { encode } = mark;
    const [T] = columnOf(encode, channel);
    const normalizeReducer = createReducer(channel, rest, encode);
    const sortedDomain = groupSort(I, normalizeReducer, (i) => T[i]);
    if (reverse) sortedDomain.reverse();
    const s = typeof slice === 'number' ? [0, slice] : slice;
    const slicedDomain = slice ? sortedDomain.slice(...s) : sortedDomain;
    return [
      I,
      deepMix(mark, {
        scale: {
          [channel]: {
            domain: slicedDomain,
          },
        },
      }),
    ];
  };
};

Sort.props = {};
