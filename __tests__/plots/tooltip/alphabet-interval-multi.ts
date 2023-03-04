import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetIntervalMulti(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'interval',
        padding: 0,
        data: {
          type: 'fetch',
          value: 'data/alphabet.csv',
        },
        axis: false,
        legend: false,
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'steelblue',
        },
        tooltip: ['letter', 'frequency'],
      },
    ],
  };
}

alphabetIntervalMulti.steps = tooltipSteps(0);
