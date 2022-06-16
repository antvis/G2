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
