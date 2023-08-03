import { G2Spec } from '../../../src';

export function populationIntervalDivergingAutoPaddingUndefinedTitle(): G2Spec {
  return {
    type: 'interval',
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      transform: [
        {
          type: 'filter',
          callback: (d) => d.year === 2000,
        },
      ],
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
      x: { range: [1, 0] },
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
  };
}
