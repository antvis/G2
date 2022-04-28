import { deepMix } from '@antv/util';

/**
 * Adaptor return default options for raw options.
 */
export function useDefaultAdaptor<T>(
  adaptor: (options: T, ...rest: any[]) => T,
) {
  return (options?: T): T => deepMix({}, adaptor(options), options);
}

/**
 * Adaptor return options override raw options.
 */
export function useOverrideAdaptor<T>(
  adaptor: (options: T, ...rest: any[]) => T,
) {
  return (options?: T): T => deepMix({}, options, adaptor(options));
}
