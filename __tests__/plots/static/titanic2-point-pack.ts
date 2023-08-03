import { G2Spec } from '../../../src';

export function titanic2PointPack(): G2Spec {
  return {
    type: 'facetRect',
    data: {
      type: 'fetch',
      value: 'data/titanic2.csv',
      transform: [
        {
          type: 'sortBy',
          fields: [['Survived', false]],
        },
      ],
    },
    paddingRight: 80,
    encode: {
      x: 'Class',
      y: 'Sex',
    },
    children: [
      {
        type: 'point',
        transform: [{ type: 'pack' }],
        encode: {
          color: 'Survived',
          shape: 'point',
        },
      },
    ],
  };
}
