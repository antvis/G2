import { G2Spec } from '../../../src';

export function populationIntervalLayered(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      format: 'csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.year === 2000,
        },
      ],
    },
    transform: [{ type: 'groupX', y: 'sum' }],
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
    },
    axis: { y: { labelFormatter: '~s' } },
    encode: {
      x: 'age',
      y: 'people',
      color: 'sex',
    },
    style: {
      fillOpacity: 0.7,
    },
  };
}
