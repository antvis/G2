import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function morleyBoxDefaultExtend(): G2Spec {
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
      point: false,
    },
  };
}

morleyBoxDefaultExtend.steps = tooltipSteps(0);
