import { TransformComponent as TC } from '../runtime';
import { useMemoTransform } from './utils';

export type SortByOptions = {
  fields?: string[];
  order?: 'DESC' | 'ASC';
};

/**
 * @todo Should immutable?
 */
export const SortBy: TC<SortByOptions> = (options) => {
  const { fields: F = [], order = 'ASC' } = options;
  return useMemoTransform(
    (data) => {
      const asc = (a, b) =>
        F.reduce(
          (eq, f) => (eq !== 0 ? eq : a[f] < b[f] ? -1 : +(a[f] !== b[f])),
          0,
        );
      const desc = (a, b) => asc(b, a);
      const comparator = order === 'ASC' ? asc : desc;
      return data.sort(comparator);
    },
    [F],
  );
};

SortBy.props = {};
