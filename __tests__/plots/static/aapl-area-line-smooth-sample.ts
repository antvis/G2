import { G2Spec } from '../../../src';

export function aaplAreaLineSmoothSample(): G2Spec {
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
          shape: 'smooth',
        },
        style: {
          lineWidth: 4,
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
          shape: 'smooth',
        },
        style: {
          fillOpacity: 0.5,
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
