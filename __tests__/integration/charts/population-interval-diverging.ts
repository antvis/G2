import { G2Spec } from '../../../src';

export function populationIntervalDiverging(): G2Spec {
  return {
    type: 'interval',
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
    coordinates: [{ type: 'transpose' }],
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
      x: { range: [1, 0] },
    },
    axis: {
      y: { tickFormatter: '~s' },
    },
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
  };
}
