import { G2Spec } from '../../../src';

export function alphabetIntervalSortXDomain(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
    },
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    scale: { x: { domain: ['A', 'B', 'C'] } },
    axis: { y: { labelFormatter: '.0%' } },
  };
}
