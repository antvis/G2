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
      x: {},
    },
  };
}
