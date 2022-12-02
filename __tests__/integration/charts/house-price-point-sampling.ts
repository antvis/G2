import { G2Spec } from '../../../src';

export function housePricePointSampling(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/house-price-area.json',
      transform: [
        {
          type: 'custom',
          callback: (data) => data.map((d) => ({ x: d[0], y: d[1] })),
        },
        {
          type: 'sampling',
          fields: ['x', 'y'],
          thresholds: 1000,
          strategy: 'median',
        },
      ],
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'point',
      color: '#24b7f2',
      size: 2,
    },
  };
}

housePricePointSampling.maxError = 100;
