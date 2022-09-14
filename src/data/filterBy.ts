import { DataComponent as DC } from '../runtime';
import { FilterByTransform } from '../spec';
import { normalizeFields } from './utils/fields';

export type FilterByOptions = Omit<FilterByTransform, 'type'>;

function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}

/**
 * Filter data by specified fields and filter callback for each fields.
 * It saves datum with every fields defined by default.
 */
export const FilterBy: DC<FilterByOptions> = (options) => {
  const { fields: F = [] } = options;

  const processorF = normalizeFields(F);

  return (data) =>
    data.filter((d: any) => {
      return processorF.every(([field, callback = defined]) =>
        callback(d[field]),
      );
    });
};

FilterBy.props = {};
