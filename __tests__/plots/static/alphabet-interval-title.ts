import { G2Spec } from '../../../src';

export function alphabetIntervalTitle(): G2Spec {
  return {
    title: {
      title: 'Use frequency of keyboard keys',
      subtitle: 'The mostest frequency letter are E, T, A.',
      align: 'right',
      subtitleFill: 'steelblue',
    },
    type: 'interval',
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
  };
}
