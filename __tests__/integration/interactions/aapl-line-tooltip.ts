import { G2Spec } from '../../../src';

export function aaplLineTooltip(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
        },
        encode: {
          x: 'date',
          y: 'close',
        },
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

aaplLineTooltip.skip = true;
