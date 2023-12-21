import { G2Spec } from '../../../src';

export function titanicPointPackSharedRowData(): G2Spec {
  return {
    type: 'facetRect',
    data: {
      type: 'fetch',
      value: 'data/titanic.csv',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived'],
        },
        {
          type: 'map',
          callback: ({ survived, ...d }) => ({
            ...d,
            survived: survived + '',
          }),
        },
      ],
    },
    shareData: true,
    encode: {
      x: 'pclass',
    },
    children: [
      {
        type: 'point',
        transform: [{ type: 'pack', direction: 'row' }],
        legend: {
          color: { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') },
        },
        encode: {
          color: 'survived',
          shape: 'point',
        },
      },
    ],
  };
}
