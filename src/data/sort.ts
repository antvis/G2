import { DataComponent as DC } from '../runtime';
import { SortTransform } from '../spec';

export type SortOptions = Omit<SortTransform, 'type'>;

export function defined(d: any): boolean {
  return d !== undefined && d !== null && !Number.isNaN(d);
}

/**
 * Sort data similar with Array.prototypo.sort.
 */
export const Sort: DC<SortOptions> = (options) => {
  const { callback } = options;
  return (data) => (Array.isArray(data) ? [...data].sort(callback) : data);
};

Sort.props = {};
