import { G2Spec } from '../../../src';

export function moviesIntervalMultipleMeasure(): G2Spec {
  return {
    type: 'view',
    paddingBottom: 150,
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'groupX', y: 'sum' }],
        axis: {
          y: { tickFormatter: '~s' },
          x: { labelRotate: 90 },
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
