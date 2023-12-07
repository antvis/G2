import { G2Spec } from '../../../src';

export function housePricePointSample(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/house-price-area.json',
    },
    encode: {
      x: (d) => d[0],
      y: (d) => d[1],
      shape: 'point',
      color: '#24b7f2',
      size: 2,
    },
    transform: [
      {
        type: 'sample',
        thresholds: 1000,
      },
    ],
  };
}
