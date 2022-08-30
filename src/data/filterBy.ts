import { DataComponent as DC } from '../runtime';
import { FilterByTransform } from '../spec';

export type FilterByOptions = Omit<FilterByTransform, 'type'>;

function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}

/**
 * Filter data by specified fields and filter callback for each fields.
 * It saves datum with every fields defined by default.
 */
export const FilterBy: DC<FilterByOptions> = (options) => {
  const { fields: F = [], callback = defined } = options;
  return (data) => data.filter((d: any) => F.every((f) => callback(d[f])));
};

FilterBy.props = {};
