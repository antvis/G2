import { G2Spec } from '../../../src';

export function alphabetIntervalMinWidth(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    scale: {
      x: { padding: 0.9 },
    },
    style: {
      minWidth: 16,
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
  };
}
