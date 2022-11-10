import { G2Spec } from '../../../src';

export function morleyBoxExtend(): G2Spec {
  return {
    type: 'boxPlot',
    data: {
      type: 'fetch',
      value: 'data/morley.csv',
    },
    encode: {
      x: 'Expt',
      y: 'Speed',
    },
    style: {
      extend: true,
    },
  };
}
