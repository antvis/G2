import { G2Spec } from '../../../src';

export function unemploymentAreaNormalizedStacked(): G2Spec {
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
        transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
        encode: {
          x: 'date',
          y: 'unemployed',
          color: 'industry',
        },
      },
    ],
  };
}
