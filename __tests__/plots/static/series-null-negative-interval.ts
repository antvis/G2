import { G2Spec } from '../../../src';

export function seriesNullNegativeInterval(): G2Spec {
  return {
    type: 'interval',
    data: [
      { x: 'x1', z: 'a', y: 100 },
      { x: 'x1', z: 'b', y: 200 },
      { x: 'x1', z: 'c', y: null },
      { x: 'x2', z: 'a', y: 300 },
      { x: 'x2', z: 'b', y: 100 },
      { x: 'x2', z: 'c', y: -100 },
    ],
    encode: {
      x: 'x',
      y: 'y',
      color: 'z',
      series: 'z',
    },
  };
}
