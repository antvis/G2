import { G2Spec } from '../../../src';

export function alphabetIntervalLabelOverflowHide(): G2Spec {
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
      color: 'steelblue',
    },
    labels: [
      {
        text: 'frequency',
        position: 'inside',
        formatter: (_, datum) => {
          return (datum.frequency * 100).toFixed(0) + '%';
        },
        transform: [{ type: 'overflowHide' }],
      },
    ],
  };
}
