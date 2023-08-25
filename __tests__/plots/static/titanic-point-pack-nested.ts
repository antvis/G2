import { G2Spec } from '../../../src';

export function titanicPointPackNested(): G2Spec {
  return {
    type: 'facetRect',
    height: 600,
    data: {
      type: 'fetch',
      value: 'data/titanic.csv',
      transform: [
        {
          type: 'sortBy',
          fields: ['survived', 'sex'],
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
    paddingRight: 50,
    paddingBottom: 60,
    paddingLeft: 80,
    encode: {
      y: 'pclass',
    },
    shareSize: true,
    children: [
      {
        type: 'facetRect',
        encode: { x: 'survived' },
        axis: {
          y: false,
          x: {
            labelFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
            position: 'bottom',
          },
        },
        shareSize: true,
        children: [
          {
            type: 'facetRect',
            encode: { y: 'sex' },
            shareSize: true,
            axis: {
              x: false,
              y: { position: 'left' },
            },
            children: [
              {
                type: 'view',
                children: [
                  {
                    type: 'point',
                    transform: [{ type: 'pack' }],
                    legend: {
                      color: {
                        labelFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
                      },
                    },
                    encode: {
                      color: 'survived',
                      shape: 'point',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
