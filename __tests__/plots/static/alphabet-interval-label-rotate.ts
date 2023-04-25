import { G2Spec } from '../../../src';

export function alphabetIntervalLabelRotate(): G2Spec {
  return {
    type: 'interval',
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
      transform: [{ type: 'slice', end: 5 }],
    },
    axis: { y: { labelFormatter: '.0%' } },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    labels: [
      {
        text: 'letter',
        style: {
          transform: 'translateY(10) rotate(45)',
          transformOrigin: 'center center',
          fontSize: 30,
        },
      },
    ],
  };
}
