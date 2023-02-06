import { G2Spec } from '../../../src';

export function aaplLineBasicLabelOverlapHide(): G2Spec {
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
    labels: [
      {
        text: 'close',
        transform: [
          {
            type: 'overlapHide',
          },
        ],
      },
    ],
  };
}

aaplLineBasicLabelOverlapHide.maxError = 100;
