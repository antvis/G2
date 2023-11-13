import { G2Spec } from '../../../src';

export function unemploymentAreaStacked(): G2Spec {
  return {
    width: 800,
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: 'date',
      y: 'unemployed',
      color: 'industry',
    },
  };
}
