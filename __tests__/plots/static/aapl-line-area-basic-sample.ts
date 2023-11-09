import { G2Spec } from '../../../src';

export function aaplLineAreaBasicSample(): G2Spec {
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
        transform: [
          {
            type: 'sample',
            thresholds: 100,
            strategy: 'lttb',
          },
        ],
      },
      {
        type: 'area',
        encode: {
          x: 'date',
          y: 'close',
        },
        transform: [
          {
            type: 'sample',
            thresholds: 100,
            strategy: 'lttb',
          },
        ],
        style: {
          fillOpacity: 0.5,
        },
      },
    ],
  };
}
