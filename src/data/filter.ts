import { DataComponent as DC } from '../runtime';
import { FilterDataTransform } from '../spec';

export type FilterDataOptions = Omit<FilterDataTransform, 'type'>;

export function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}

/**
 * Filter data by specified fields and filter callback for each fields.
 * It saves datum with every fields defined by default.
 */
export const Filter: DC<FilterDataOptions> = (options) => {
  const { callback = defined } = options;
  return (data) => data.filter(callback);
};

Filter.props = {};
