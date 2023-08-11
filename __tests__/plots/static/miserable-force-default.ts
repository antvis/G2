import { G2Spec } from '../../../src';

export function miserableForceDefault(): G2Spec {
  return {
    type: 'forceGraph',
    data: {
      type: 'fetch',
      value: 'data/miserable.json',
    },
    scale: { color: { type: 'ordinal' } },
  };
}
