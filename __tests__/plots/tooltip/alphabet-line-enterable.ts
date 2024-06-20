import { G2Spec } from '../../../src';

export function alphabetLineEnterable(): G2Spec {
  return {
    type: 'line',
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

alphabetLineEnterable.skip = true;
