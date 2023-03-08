import { deepMix } from '@antv/util';
import {
  max as d3Max,
  mean as d3Mean,
  sum as d3Sum,
  min as d3Min,
  median as d3Median,
} from 'd3-array';
import { TransformComponent as TC, Primitive, G2Mark } from '../runtime';
import { GroupTransform, Reducer } from '../spec';
import { indexOf } from '../utils/array';
import { columnOf, column, nonConstantColumn } from './utils/helper';

export type GroupNOptions = Omit<
  GroupTransform & {
    groupBy?: (
      I: number[],
      mark: G2Mark,
      options?: Record<string, any>,
    ) => number[][];
  },
  'type'
>;

type ReducerFunction = (I: number[], V: Primitive[]) => Primitive;

type Formatter = (d: Primitive) => string;

function builtinFormatter(summary: string) {
  return (d: string) => (d === null ? summary : `${summary} of ${d}`);
}

function normalizeReducer(reducer: Reducer): [ReducerFunction, Formatter] {
  if (typeof reducer === 'function') return [reducer, null];
  const registry = { mean, max, count, first, last, sum, min, median };
  const reducerFunction = registry[reducer];
  if (!reducerFunction) throw new Error(`Unknown reducer: ${reducer}.`);
  return reducerFunction();
}

function mean(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Mean(I, (i) => +V[i]);
  const formatter: Formatter = builtinFormatter('mean');
  return [reducer, formatter];
}

function median(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Median(I, (i) => +V[i]);
  const formatter: Formatter = builtinFormatter('median');
  return [reducer, formatter];
}

function max(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Max(I, (i) => +V[i]);
  const formatter: Formatter = builtinFormatter('max');
  return [reducer, formatter];
}

function min(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Min(I, (i) => +V[i]);
  const formatter: Formatter = builtinFormatter('min');
  return [reducer, formatter];
}

function count(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => I.length;
  const formatter: Formatter = builtinFormatter('count');
  return [reducer, formatter];
}

function sum(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Sum(I, (i) => +V[i]);
  const formatter: Formatter = builtinFormatter('sum');
  return [reducer, formatter];
}

function first(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => V[I[0]];
  const formatter: Formatter = builtinFormatter('first');
  return [reducer, formatter];
}

function last(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => V[I[I.length - 1]];
  const formatter: Formatter = builtinFormatter('last');
  return [reducer, formatter];
}

/**
 * The Group transform group data by x and y channels, and aggregate.
 */
export const GroupN: TC<GroupNOptions> = (options = {}) => {
  const { groupBy, ...rest } = options;
  return (I, mark) => {
    const { data, encode } = mark;
    const groups = groupBy(I, mark);
    if (!groups) return [I, mark];

    // Extract field from from channel
    // x1 from x, y1 from y, etc,.
    const maybeFrom = (field, reducer) => {
      if (field) return field;
      const { from } = reducer;
      if (!from) return field;
      const [, field1] = columnOf(encode, from);
      return field1;
    };
    const outputs = Object.entries(rest).map(([channel, reducer]) => {
      const [reducerFunction, formatter] = normalizeReducer(reducer);
      const [V, field] = columnOf(encode, channel);
      const field1 = maybeFrom(field, reducer);
      const RV = groups.map((I) => reducerFunction(I, V ?? data));
      return [
        channel,
        {
          ...nonConstantColumn(RV, formatter?.(field1) || field1),
          aggregate: true,
        },
      ];
    });
    const reducedColumns = Object.keys(encode).map((key) => {
      const [V, fv] = columnOf(encode, key);
      const GV = groups.map((I) => V[I[0]]);
      return [key, column(GV, fv)];
    });
    const GD = groups.map((I) => data[I[0]]);
    const GI = indexOf(groups);
    return [
      GI,
      deepMix({}, mark, {
        data: GD,
        encode: Object.fromEntries([...reducedColumns, ...outputs]),
      }),
    ];
  };
};

GroupN.props = {};
