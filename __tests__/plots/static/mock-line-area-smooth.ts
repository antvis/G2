import { G2Spec } from '../../../src';

export function mockLineAreaSmooth(): G2Spec {
  return {
    type: 'view',
    data: [
      { date: '2-1', close: 1200 },
      { date: '2-2', close: 400 },
      { date: '2-3', close: 600 },
      { date: '2-4', close: 800 },
      { date: '2-5', close: 420 },
      { date: '2-6', close: 1120 },
    ],
    children: [
      {
        type: 'area',
        encode: {
          x: 'date',
          y: 'close',
          shape: 'smooth',
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
      {
        type: 'line',
        encode: {
          x: 'date',
          y: 'close',
          shape: 'smooth',
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
