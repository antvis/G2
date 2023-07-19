import { G2Spec } from '../../../src';

export function alphabetIntervalLabelContrastReverse(): G2Spec {
  return {
    width: 800,
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
    labels: [
      {
        text: 'frequency',
        position: 'inside',
        formatter: '.0%',
        transform: [
          {
            type: 'contrastReverse',
            threshold: 21,
            palette: ['#00FF00', '#ffff00'], // Use full color string to avoid screenshot error.
          },
        ],
        fill: '#000',
      },
    ],
  };
}
