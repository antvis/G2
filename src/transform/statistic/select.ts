import { maxIndex, minIndex } from 'd3-array';
import { TransformComponent as TC } from '../../runtime';
import { SelectTransform, Selector } from '../../spec';
import { merge, column } from '../utils/helper';
import { createGroups } from './utils';

export type SelectOptions = Omit<SelectTransform, 'type'>;

type SelectorFunction = (I: number[], V: number[]) => number[];

function first(I: number[], V: number[]): number[] {
  return [0];
}

function last(I: number[], V: number[]): number[] {
  const i = I.length - 1;
  return [I[i]];
}

function max(I: number[], V: number[]): number[] {
  const i = maxIndex(I, (i) => V[i]);
  return [I[i]];
}

function min(I: number[], V: number[]): number[] {
  const i = minIndex(I, (i) => V[i]);
  return [I[i]];
}

function normalizeSelector(selector: Selector): SelectorFunction {
  if (typeof selector === 'function') return selector;
  const registry = { first, last, max, min };
  return registry[selector] || first;
}

/**
 * The select transform groups marks with specified channels, and
 * filter index by specified selector for each series, say to
 * pull a single or multiple values out of each series.
 */
export const Select: TC<SelectOptions> = (options = {}) => {
  const { groupBy = 'series', ...rest } = options;
  return merge((context) => {
    const { data, columnOf, encode } = context;
    const groups = createGroups(groupBy, context);
    const [channel, selector] = Object.entries(rest)[0];
    const { [channel]: e } = encode;
    const V = columnOf(data, e);
    const selectFunction = normalizeSelector(selector);
    return {
      I: groups.flatMap((GI) => selectFunction(GI, V as number[])),
    };
  });
};

Select.props = {
  category: 'statistic',
};
