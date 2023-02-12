import { G2Spec } from '../../../src';

export function morleyBox1D(): G2Spec {
  return {
    type: 'boxplot',
    inset: 6,
    height: 120,
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/morley.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.Expt === 1,
        },
      ],
    },
    encode: {
      y: 'Speed',
    },
    style: {
      boxFill: '#aaa',
      pointStroke: '#000',
    },
  };
}
