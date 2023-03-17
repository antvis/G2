import { G2Spec } from '../../../src';
import { tooltipStepsByMarkType } from './utils';

export function morleyBoxDefault(): G2Spec {
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

morleyBoxDefault.steps = ({ canvas }) => {
  const box = tooltipStepsByMarkType('box', 0);
  const point = tooltipStepsByMarkType('point', 0);
  return [...box({ canvas }), ...point({ canvas })];
};
