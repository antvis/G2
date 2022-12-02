import { G2Spec } from '../../../src';

export function unemploymentAreaStackedSampling(): G2Spec {
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
        transform: [
          { type: 'stackY' },
          {
            type: 'sampling',
            thresholds: 30,
            groupBy: 'color',
            y: 'max',
          },
        ],
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
