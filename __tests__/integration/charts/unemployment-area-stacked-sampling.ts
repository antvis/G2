import { G2Spec } from '../../../src';

export function unemploymentAreaStackedSampling(): G2Spec {
  return {
    width: 800,
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
      transform: [
        {
          type: 'sampling',
          thresholds: 30,
          groupBy: 'industry',
          strategy: 'max',
          fields: ['unemployed'],
        },
      ],
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

unemploymentAreaStackedSampling.maxError = 100;
