import type { G2Spec } from '@/spec';

export function unemploymentAreaStacked(): G2Spec {
  return {
    width: 800,
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    children: [
      {
        type: 'area',
        transform: [{ type: 'stackY' }],
        encode: {
          x: 'date',
          y: 'unemployed',
          color: 'industry',
        },
      },
    ],
  };
}

unemploymentAreaStacked.maxError = 100;
