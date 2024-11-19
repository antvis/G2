import { G2Spec } from '../../../src';

export function emaBasic(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
          transform: [
            {
              type: 'ema',
              field: 'close',
              alpha: 0.8,
            },
          ],
        },
      },
      {
        type: 'line',
        style: {
          opacity: 0.3,
        },
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
        },
      },
    ],
    encode: {
      x: 'date',
      y: 'close',
    },
  };
}
