import { IDocument } from '@antv/g';
import { error } from '../utils/helper';
import { builtinlib } from '../lib/builtinlib';
import { G2ComponentOptions, G2Context, G2Library } from './types/options';
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
  publicLibrary: G2Library,
): [(options: O, context?) => V, (type: O['type']) => C] {
  const library = { ...builtinlib(), ...publicLibrary };

  const create = (type: O['type']) => {
    if (typeof type !== 'string') return type;
    const key = `${namespace}.${type}`;
    return library[key] || error(`Unknown Component: ${key}`);
  };

  const use = (options: O, context?) => {
    const { type, ...rest } = options;
    if (!type) error(`Plot type is required!`);
    const currentLibrary = create(type);
    return currentLibrary?.(rest, context);
  };

  return [use, create];
}

export function documentOf(library: G2Context): IDocument {
  const { canvas, group } = library;
  return (
    canvas?.document ||
    group?.ownerDocument ||
    error(`Cannot find library document`)
  );
}
