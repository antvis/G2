import { G2Spec } from '../../../src';

export function unemploymentAreaStacked(): G2Spec {
  return {
    width: 800,
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/unemployment.csv',
    },
    children: [
      {
        type: 'area',
        transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
        encode: {
          x: 'date',
          y: 'unemployed',
          color: 'industry',
        },
        scale: {
          x: { type: 'time' },
        },
      },
    ],
  };
}
