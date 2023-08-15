import { G2Spec } from '../../../src';

export function alphabetIntervalAxisArrowPosition(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: {
      x: { line: true, arrow: true, position: 'top' },
      y: { labelFormatter: '.0%', line: true, arrow: true, position: 'right' },
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
  };
}
