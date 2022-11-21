import { G2Spec } from '../../../src';

export function alphabetIntervalNonAnimate(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    animate: false,
  };
}

// Only test the first state and last state.
alphabetIntervalNonAnimate.intervals = [[]];
