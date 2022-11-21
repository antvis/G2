import { G2Spec } from '../../../src';

export function alphabetIntervalTooltipTitle(): G2Spec {
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
          title: 'letter',
        },
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

alphabetIntervalTooltipTitle.skip = true;
