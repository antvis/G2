import { G2Spec } from '../../../src';

export function alphabetIntervalTooltip1d(): G2Spec {
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
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

alphabetIntervalTooltip1d.skip = true;
