import { G2Spec } from '../../../src';

export function populationIntervalDiverging(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      transform: [
        {
          type: 'filterBy',
          fields: [['year', (d) => d === 2000]],
        },
      ],
    },
    coordinate: [{ type: 'transpose' }],
    scale: {
      color: { type: 'ordinal', range: ['#ca8861', '#675193'] },
      y: { formatter: '~s' },
      x: { range: [1, 0] },
    },
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
  };
}
