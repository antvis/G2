import { G2Spec } from '../../../src';

export function moviesIntervalMultipleMeasure(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'sum' }],
        axis: {
          y: { labelFormatter: '~s' },
          x: { labelTransform: 'rotate(90)' },
        },
        encode: {
          x: 'Major Genre',
          y: 'Worldwide Gross',
          series: () => 'Worldwide Gross',
          color: () => 'Worldwide Gross',
        },
      },
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'sum' }],
        encode: {
          x: 'Major Genre',
          y: 'US Gross',
          color: () => 'US Gross',
          series: () => 'US Gross',
        },
      },
    ],
  };
}
