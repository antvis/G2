import { G2Spec } from '../../../src';

export function aaplLineBasicSampling(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
      transform: [
        {
          type: 'sampling',
          fields: ['y'],
          thresholds: 100,
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
    },
  };
}

aaplLineBasicSampling.maxError = 100;
