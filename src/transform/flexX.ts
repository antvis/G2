import { deepMix } from '@antv/util';
import { rollups, sum, Primitive } from 'd3-array';
import { TransformComponent as TC } from '../runtime';
import { FlexXTransform } from '../spec';
import { columnOf } from './utils/helper';

export type FlexXOptions = Omit<FlexXTransform, 'type'>;

function valueOf(data: any, field: FlexXOptions['field']) {
  if (typeof field === 'string') return data.map((d) => d[field]);
  return data.map(field);
}

function createReducer(
  reducer: FlexXOptions['reducer'],
  V: Primitive[],
): (I: number[]) => any {
  if (typeof reducer === 'function') return (GI: number[]) => reducer(GI, V);
  if (reducer === 'sum') return (GI: number[]) => sum(GI, (i) => +V[i]);
  throw new Error(`Unknown reducer: ${reducer}`);
}

/**
 * Produce flex options from data for x scale.
 */
export const FlexX: TC<FlexXOptions> = (options = {}) => {
  const { field, channel = 'y', reducer = 'sum' } = options;
  return (I, mark) => {
    const { data, encode } = mark;
    const [x] = columnOf(encode, 'x');
    const V = field ? valueOf(data, field) : columnOf(encode, channel)[0];
    const reducerFunction = createReducer(reducer, V);
    const flex = rollups(I, reducerFunction, (i) => x[i]).map((d) => d[1]);
    return [I, deepMix({}, mark, { scale: { x: { flex } } })];
  };
};

FlexX.props = {};
