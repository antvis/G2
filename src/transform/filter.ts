import { deepMix } from '@antv/util';
import { G2Mark, TransformComponent as TC } from '../runtime';
import { FilterTransform } from '../spec';
import { defined } from '../utils/helper';
import { columnOf } from './utils/helper';

export type FilterOptions = Omit<FilterTransform, 'type'>;

function normalizeValue(value) {
  if (typeof value === 'object') return [value.value, value.ordinal];
  else return [value, true];
}

function filterWhenNoElements(mark: G2Mark) {
  const { encode } = mark;

  // keep y-axis
  const noElementMark = {
    ...mark,
    encode: {
      ...mark.encode,
      y: {
        ...mark.encode.y,
        value: [],
      },
    },
  };

  const targetField = encode?.color?.field;
  if (!encode || !targetField) {
    return noElementMark;
  }

  // 获取color的筛选源
  let filterObject;

  for (const [key, v] of Object.entries(encode)) {
    if ((key === 'x' || key === 'y') && v.field === targetField) {
      filterObject = {
        ...filterObject,
        [key]: {
          ...v,
          value: [],
        },
      };
    }
  }

  if (!filterObject) {
    return noElementMark;
  }

  return {
    ...mark,
    encode: {
      ...mark.encode,
      ...filterObject,
    },
  };
}

/**
 * The Filter transform filter channels.
 */
export const Filter: TC<FilterOptions> = (options = {}) => {
  return (I, mark) => {
    const { encode, data } = mark;
    const filters = Object.entries(options)
      .map(([key, v]) => {
        const [V] = columnOf(encode, key);
        // Skip empty channel.
        if (!V) return null;
        const [value, ordinal = true] = normalizeValue(v);
        if (typeof value === 'function') return (i) => value(V[i]);
        if (ordinal) {
          const expectedValues = Array.isArray(value) ? value : [value];
          // Skip empty expected values.
          if (expectedValues.length === 0) return null;
          return (i) => expectedValues.includes(V[i]);
        } else {
          const [start, end] = value;
          return (i) => V[i] >= start && V[i] <= end;
        }
      })
      .filter(defined);
    // Filter index and channels.
    const totalFilter = (i) => filters.every((f) => f(i));
    const FI = I.filter(totalFilter);
    const newIndex = FI.map((_, i) => i);

    if (filters.length === 0) {
      const targetMark = filterWhenNoElements(mark);
      return [I, targetMark];
    }

    const newEncodes = Object.entries(encode).map(([key, encode]) => {
      return [
        key,
        {
          ...encode,
          value: newIndex
            .map((i) => encode.value[FI[i]])
            .filter((v) => v !== undefined),
        },
      ];
    });
    return [
      newIndex,
      deepMix({}, mark, {
        encode: Object.fromEntries(newEncodes),
        // Filter data for tooltip item.
        data: FI.map((i) => data[i]),
      }),
    ];
  };
};

Filter.props = {};
