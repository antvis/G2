import { G2Spec } from '../../../src';

export function alphabetIntervalDataSort(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
      transform: [
        {
          type: 'sort',
          callback: (a, b) => a.frequency - b.frequency,
        },
      ],
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
  };
}
