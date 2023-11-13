import { G2Spec } from '../../../src';

export function aaplLineBasicSample(): G2Spec {
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
        type: 'sample',
        thresholds: 100,
        strategy: 'lttb',
      },
    ],
  };
}
