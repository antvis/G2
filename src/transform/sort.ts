import { deepMix } from '@antv/util';
import {
  Primitive,
  groupSort,
  max,
  min,
  sum,
  mean,
  median,
  sort,
} from 'd3-array';
import { G2Mark, TransformComponent as TC } from '../runtime';
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
  ordinal?: boolean;
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

function sortQuantitative(I, mark, options): [number[], G2Mark] {
  const { reverse, channel } = options;
  const { encode } = mark;
  const [V] = columnOf(encode, channel);
  const sortedI = sort(I, (i: number) => V[i]);
  if (reverse) sortedI.reverse();
  // const s = typeof slice === 'number' ? [0, slice] : slice;
  return [sortedI, mark];
}

// If domain is specified, only sort data in the domain.
function filterIndex(I, values, specifiedDomain): number[] {
  if (!Array.isArray(specifiedDomain)) return I;
  const domain = new Set(specifiedDomain);
  return I.filter((i) => domain.has(values[i]));
}

function sortOrdinal(I, mark, options): [number[], G2Mark] {
  const { reverse, slice, channel, ...rest } = options;
  const { encode, scale = {} } = mark;
  const domain = scale[channel]?.domain;
  const [T] = columnOf(encode, channel);
  const normalizeReducer = createReducer(channel, rest, encode);
  const SI = filterIndex(I, T, domain);
  const sortedDomain = groupSort(SI, normalizeReducer, (i: number) => T[i]);
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
}

/**
 * Sort marks groups by groups.
 */
export const Sort: TC<SortOptions> = (options = {}) => {
  const { reverse = false, slice, channel, ordinal = true, ...rest } = options;
  return (I, mark) => {
    if (!ordinal) {
      return sortQuantitative(I, mark, {
        reverse,
        slice,
        channel,
        ...rest,
      });
    }
    return sortOrdinal(I, mark, { reverse, slice, channel, ...rest });
  };
};

Sort.props = {};
