import { deepMix } from '@antv/util';
import { TransformComponent as TC } from '../runtime';
import { FilterTransform } from '../spec';
import { defined } from '../utils/helper';
import { columnOf } from './utils/helper';

export type FilterOptions = Omit<FilterTransform, 'type'>;

/**
 * The Filter transform filter channels.
 */
export const Filter: TC<FilterOptions> = (options = {}) => {
  return (I, mark) => {
    const { encode } = mark;
    const filters = Object.entries(options)
      .map(([key, value]) => {
        const [V] = columnOf(encode, key);
        // Skip empty channel.
        if (!V) return null;
        if (typeof value === 'function') return (i) => value(V[i]);
        const expectedValues = Array.isArray(value) ? value : [value];
        // Skip empty expected values.
        if (expectedValues.length === 0) return null;
        return (i) => expectedValues.includes(V[i]);
      })
      .filter(defined);

    // Skip empty filters.
    if (filters.length === 0) return [I, mark];

    // Filter index and channels.
    const totalFilter = (i) => filters.every((f) => f(i));
    const FI = I.filter(totalFilter);
    const newIndex = FI.map((_, i) => i);
    const newEncodes = Object.entries(encode).map(([key, encode]) => {
      return [
        key,
        {
          ...encode,
          value: newIndex.map((i) => encode.value[FI[i]]),
        },
      ];
    });
    return [
      newIndex,
      deepMix({}, mark, { encode: Object.fromEntries(newEncodes) }),
    ];
  };
};

Filter.props = {};
