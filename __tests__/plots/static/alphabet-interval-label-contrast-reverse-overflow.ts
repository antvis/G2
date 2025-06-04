import { G2Spec } from '../../../src';

export function alphabetIntervalLabelContrastReverseOverflow(): G2Spec {
  return {
    width: 400,
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
      color: 'letter',
    },
    scale: {
      color: {
        range: ['#666'],
      },
    },
    labels: [
      {
        text: 'frequency',
        position: 'inside',
        formatter: '.0%',
        transform: [
          {
            type: 'contrastReverse',
            threshold: 2,
            autoStroke: {
              lineWidth: 2,
            },
          },
        ],
      },
    ],
  };
}
