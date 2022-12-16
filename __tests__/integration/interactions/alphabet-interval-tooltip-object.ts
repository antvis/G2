import { G2Spec } from '../../../src';

export function alphabetIntervalTooltipObject(): G2Spec {
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
          tooltip: (d) => ({
            color: 'red',
            value: d.frequency,
            name: 'F',
          }),
          tooltip1: (d) => ({
            color: 'yellow',
            value: d.letter,
            name: 'L',
          }),
        },
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

alphabetIntervalTooltipObject.skip = true;
