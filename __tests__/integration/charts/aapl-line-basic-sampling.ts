import { G2Spec } from '../../../src';

export function aaplLineBasicSampling(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    transform: [
      {
        type: 'sampling',
        thresholds: 100,
        y: 'mean',
      },
    ],
  };
}

aaplLineBasicSampling.maxError = 100;
