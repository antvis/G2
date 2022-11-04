import type { G2Spec } from '@/spec';

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
  };
}

aaplLineBasic.maxError = 100;
