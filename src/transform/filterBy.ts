import { TransformComponent as TC } from '../runtime';
import { FilterByTransform } from '../spec';
import { useMemoTransform } from './utils';

export type FilterByOptions = Omit<FilterByTransform, 'type'>;

export const FilterBy: TC<FilterByOptions> = (options) => {
  const { fields: F = [], callback = defined } = options;
  return useMemoTransform(
    (data) => data.filter((d: any) => F.every((f) => callback(d[f]))),
    [options],
  );
};

FilterBy.props = {};

function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}
