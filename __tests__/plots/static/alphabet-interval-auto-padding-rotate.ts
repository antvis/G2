import { G2Spec } from '../../../src';

export function alphabetIntervalAutoRotate(): G2Spec {
  return {
    type: 'interval',
    width: 800,
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    axis: {
      y: { labelFormatter: (d) => d + '0000' },
      x: {
        labelFormatter: (d) => d + '00',
        labelTransform: 'rotate(60)',
      },
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
