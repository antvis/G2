import { DataComponent as DC } from '../runtime';
import { SortByTransform } from '../spec';
import { normalizeFields } from './utils/fields';

export type SortByOptions = Omit<SortByTransform, 'type'>;

/**
 * Immutable data sort by specified fields.
 */
export const SortBy: DC<SortByOptions> = (options) => {
  const { fields: F = [] } = options;

  const normalizedF = normalizeFields(F, true);

  return (data) => {
    const comparator = (a: any, b: any) =>
      normalizedF.reduce((ret: number, [field, order = true]) => {
        if (ret !== 0) {
          return ret;
        }

        if (order) {
          return a[field] < b[field] ? -1 : +(a[field] !== b[field]);
        } else {
          return a[field] > b[field] ? -1 : +(a[field] !== b[field]);
        }
      }, 0);

    return [...data].sort(comparator);
  };
};

SortBy.props = {};
