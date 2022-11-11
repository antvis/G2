import { G2Spec } from '../../../src';

export function morleyBox(): G2Spec {
  return {
    type: 'boxplot',
    inset: 6,
    data: {
      type: 'fetch',
      value: 'data/morley.csv',
    },
    encode: {
      x: 'Expt',
      y: 'Speed',
    },
    style: {
      boxFill: '#aaa',
      pointStroke: '#000',
    },
  };
}
