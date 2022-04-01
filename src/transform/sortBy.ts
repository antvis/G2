import { TransformComponent as TC } from '../runtime';
import { SortByTransform } from '../spec';
import { useMemoTransform } from './utils/memo';

export type SortByOptions = Omit<SortByTransform, 'type'>;

/**
 * Immutable data sort by specified fields.
 */
export const SortBy: TC<SortByOptions> = (options) => {
  const { fields: F = [], order = 'ASC' } = options;
  return useMemoTransform(
    (data) => {
      const asc = (a: any, b: any) =>
        F.reduce(
          (eq, f) => (eq !== 0 ? eq : a[f] < b[f] ? -1 : +(a[f] !== b[f])),
          0,
        );
      const desc = (a: any, b: any) => asc(b, a);
      const comparator = order === 'ASC' ? asc : desc;
      return [...data].sort(comparator);
    },
    [options],
  );
};

SortBy.props = {};
