import { G2Spec } from '../../../src';

export function peoplePointStacked(): G2Spec {
  return {
    type: 'view',
    height: 360,
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value: 'data/people.csv',
        },
        transform: [{ type: 'stackY' }],
        scale: {
          x: { field: 'Age →', nice: true },
          y: {
            field: '← Women · Men →',
            formatter: (d) => `${Math.abs(d)}`,
          },
        },
        encode: {
          x: (d) => 2021 - d.birth,
          y: (d) => (d.gender === 'M' ? 1 : -1),
          color: 'gender',
        },
      },
      {
        type: 'lineY',
        data: [0],
        style: {
          stroke: 'black',
        },
      },
    ],
  };
}
