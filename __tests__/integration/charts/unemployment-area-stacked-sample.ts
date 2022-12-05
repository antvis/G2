import { G2Spec } from '../../../src';

export function unemploymentAreaStackedSample(): G2Spec {
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
          {
            type: 'sample',
            thresholds: 30,
            groupBy: 'color',
            y: 'max',
          },
          { type: 'stackY' },
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

unemploymentAreaStackedSample.maxError = 100;
