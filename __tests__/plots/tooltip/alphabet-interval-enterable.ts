import { G2Spec } from '../../../src';

export function alphabetIntervalEnterable(): G2Spec {
  return {
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
    interaction: {
      tooltip: {
        enterable: true,
      },
    },
  };
}

alphabetIntervalEnterable.skip = true;
