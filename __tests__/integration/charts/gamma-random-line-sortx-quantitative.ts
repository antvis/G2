import { G2Spec } from '../../../src';

export function gammaRandomLineSortXQuantitative(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/gamma-random.json',
    },
    encode: {
      x: (d) => d,
      color: 'steelblue',
      shape: 'smooth',
    },
    transform: [
      { type: 'binX', y: 'count' },
      { type: 'sortX', ordinal: false },
    ],
    style: {
      lineWidth: 2,
    },
  };
}
