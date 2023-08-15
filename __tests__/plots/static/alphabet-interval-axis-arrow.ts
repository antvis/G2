import { G2Spec } from '../../../src';

export function alphabetIntervalAxisArrow(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: {
      x: { line: true, arrow: true },
      y: { labelFormatter: '.0%', line: true, arrow: true },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
  };
}
