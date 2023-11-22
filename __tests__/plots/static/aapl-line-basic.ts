import { G2Spec } from '../../../src';

export function aaplLineBasic(): G2Spec {
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
    slider: {
      x: {
        // sparklineData: [[10, 2, 3, 4, 15, 10, 5, 0, 3, 1]]
      }
    },
  };
}
