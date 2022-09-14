import { G2Spec } from '../../../src/';

export function alphabetBarChart(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', channel: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
      format: 'csv',
    },
    scale: {
      y: { formatter: '.0%' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
  };
}
