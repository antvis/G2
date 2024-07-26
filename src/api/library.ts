import { G2ComponentNamespaces, G2Component } from '../runtime';
import { registerSymbol, type SymbolFactor } from '../utils/marker';

export const library = {};

// @todo Warn if override existing key.
export function register(
  key: `${G2ComponentNamespaces | 'symbol'}.${any}`,
  component: G2Component | SymbolFactor,
) {
  if (key.startsWith('symbol.'))
    registerSymbol(key.split('.').pop(), component as SymbolFactor);
  else Object.assign(library, { [key]: component });
}
