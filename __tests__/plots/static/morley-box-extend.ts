import { G2Spec } from '../../../src';

export function morleyBoxExtend(): G2Spec {
  return {
    type: 'boxplot',
    data: {
      type: 'fetch',
      value: 'data/morley.csv',
    },
    encode: {
      x: 'Expt',
      y: 'Speed',
    },
    style: {
      point: false,
    },
  };
}
