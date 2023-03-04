import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetIntervalObject(): G2Spec {
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
        tooltip: [
          (d) => ({
            color: 'red',
            value: d.frequency,
            name: 'F',
          }),
          (d) => ({
            color: 'yellow',
            value: d.letter,
            name: 'L',
          }),
        ],
      },
    ],
  };
}

alphabetIntervalObject.steps = tooltipSteps(0);
