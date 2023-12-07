import { G2Spec } from '../../../src';

export function aaplLineBasicTranspose(): G2Spec {
  return {
    type: 'line',
    height: 640,
    width: 480,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    encode: {
      x: 'date',
      y: 'close',
    },
  };
}
