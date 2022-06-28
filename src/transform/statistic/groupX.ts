import { group, max as d3Max, mean as d3Mean, sum as d3Sum } from 'd3-array';
import { TransformComponent as TC, Primitive } from '../../runtime';
import { GroupXTransform, Reducer } from '../../spec';
import { merge, column, field } from '../utils/helper';
import { indexOf } from '../../utils/array';

export type GroupXOptions = Omit<GroupXTransform, 'type'>;

type ReducerFunction = (I: number[], V: Primitive[]) => Primitive;

type Formatter = (d: Primitive) => string;

function normalizeReducer(reducer: Reducer): [ReducerFunction, Formatter] {
  if (typeof reducer === 'function') return [reducer, null];
  const registry = { mean, max, count, first, last, sum };
  const reducerFunction = registry[reducer];
  if (!reducerFunction) throw new Error(`Unknown reducer: ${reducer}.`);
  return reducerFunction();
}

function mean(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Mean(I, (i) => +V[i]);
  const formatter: Formatter = (d) => `mean of ${d}`;
  return [reducer, formatter];
}

function max(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Max(I, (i) => +V[i]);
  const formatter: Formatter = (d) => `max of ${d}`;
  return [reducer, formatter];
}

function count(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => I.length;
  const formatter: Formatter = (d) => `count of ${d}`;
  return [reducer, formatter];
}

function sum(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => d3Sum(I, (i) => +V[i]);
  const formatter: Formatter = (d) => `sum of ${d}`;
  return [reducer, formatter];
}

function first(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => V[0];
  const formatter: Formatter = (d) => `first of ${d}`;
  return [reducer, formatter];
}

function last(): [ReducerFunction, Formatter] {
  const reducer: ReducerFunction = (I, V) => V[I[I.length - 1]];
  const formatter: Formatter = (d) => `last of ${d}`;
  return [reducer, formatter];
}

/**
 * The GroupX transform group data by x channel, and aggregate.
 * @todo Sort among groups and apply reverse options.
 */
export const GroupX: TC<GroupXOptions> = (options = {}) => {
  const { orderBy, reverse = false, ...rest } = options;
  return merge((context) => {
    const { data, encode, columnOf, I } = context;
    const { x } = encode;
    const X = columnOf(data, x);
    const groups = X ? Array.from(group(I, (i) => X[i]).values()) : [I];
    const outputs = Object.entries(rest).map(([channel, reducer]) => {
      const { [channel]: e } = encode;
      const V = columnOf(data, e);
      const [reducerFunction, formatter] = normalizeReducer(reducer);
      const RV = groups.map((I) => reducerFunction(I, V ?? data));
      return [channel, column(field(RV, V, formatter))];
    });
    const GD = groups.map((I) => data[I[0]]);
    const GX = groups.map((I) => X[I[0]]);
    const GI = indexOf(groups);
    return {
      I: GI,
      data: GD,
      encode: {
        x: column(field(GX, X)),
        ...Object.fromEntries(outputs),
      },
    };
  });
};

GroupX.props = {
  category: 'statistic',
};
