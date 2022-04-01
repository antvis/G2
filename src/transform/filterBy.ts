import { TransformComponent as TC } from '../runtime';
import { FilterByTransform } from '../spec';
import { useMemoTransform } from './utils/memo';

export type FilterByOptions = Omit<FilterByTransform, 'type'>;

/**
 * Filter data by specified fields and filter callback for each fields.
 * It saves datum with every fields defined by default.
 */
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
