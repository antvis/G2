import { G2Spec } from '../../../src';

export function alphabetIntervalMaxWidth(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
      transform: [
        {
          type: 'slice',
          start: 0,
          end: 3,
        },
      ],
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    scale: {
      x: { padding: 0.1 },
    },
    style: {
      maxWidth: 10,
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
  };
}
