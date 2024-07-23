import { deepMix } from '@antv/util';

type Adapter<T> = (options: T, ...rest: any[]) => T;

/**
 * Adaptor return default options for raw options.
 */
export function useDefaultAdaptor<T>(adaptor: Adapter<T>): Adapter<T> {
  return (options?, ...rest) => deepMix({}, adaptor(options, ...rest), options);
}

/**
 * Adaptor return options override raw options.
 */
export function useOverrideAdaptor<T>(adaptor: Adapter<T>): Adapter<T> {
  return (options?, ...rest) => deepMix({}, options, adaptor(options, ...rest));
}

export function isObject(d) {
  if (d instanceof Date) return false;
  return typeof d === 'object';
}

export function mergeData(
  dataDescriptor: any[] | { value: any; [key: string]: any },
  dataValue: any[],
) {
  if (!dataDescriptor) return dataValue;
  if (Array.isArray(dataDescriptor)) return dataDescriptor;
  if (isObject(dataDescriptor)) {
    const { value = dataValue, ...rest } = dataDescriptor;
    return { ...rest, value };
  }
  return dataDescriptor;
}
