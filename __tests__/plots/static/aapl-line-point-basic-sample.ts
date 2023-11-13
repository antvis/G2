import { G2Spec } from '../../../src';

export function aaplLinePointBasicSample(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    children: [
      {
        type: 'line',
        encode: {
          x: 'date',
          y: 'close',
        },
      },
      {
        type: 'point',
        encode: {
          x: 'date',
          y: 'close',
          shape: 'point',
          size: 2,
        },
        transform: [
          {
            type: 'sample',
            thresholds: 100,
            strategy: 'lttb',
          },
        ],
      },
    ],
  };
}
