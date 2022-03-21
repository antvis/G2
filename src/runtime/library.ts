import { error } from '../utils/helper';
import { G2ComponentOptions, G2Library } from './types/options';
import {
  G2Component,
  G2ComponentNamespaces,
  G2ComponentValue,
} from './types/component';

export function useLibrary<
  O extends G2ComponentOptions,
  C extends G2Component,
  V extends G2ComponentValue,
>(
  namespace: G2ComponentNamespaces,
  library: G2Library,
): [(options: O) => V, (type: O['type']) => C] {
  const create = (type: O['type']) => {
    if (typeof type !== 'string') return type;
    const key = `${namespace}.${type}`;
    return library[key] || error(`Unknown Component: ${key}`);
  };
  const use = (options: O) => {
    const { type, ...rest } = options;
    return create(type)({ ...rest });
  };
  return [use, create];
}
