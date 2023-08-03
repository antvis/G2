import { G2Spec } from '../../../src';

export function alphabetIntervalViewStyle(): G2Spec {
  return {
    type: 'view',
    style: {
      plotFill: 'red',
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'sortX', by: 'y', reverse: true }],
        data: {
          type: 'fetch',
          value: 'data/alphabet.csv',
        },
        axis: {
          y: { labelFormatter: '.0%' },
          x: false,
        },
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'steelblue',
        },
        viewStyle: {
          viewFill: '#4e79a7',
          plotFill: '#f28e2c',
          mainFill: '#e15759',
          contentFill: '#76b7b2',
        },
      },
    ],
  };
}
