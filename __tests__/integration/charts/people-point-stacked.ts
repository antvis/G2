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
          x: { nice: true },
        },
        axis: {
          y: {
            title: '← Women · Men →',
            tickFormatter: Math.abs,
          },
          x: { title: 'Age →' },
        },
        encode: {
          x: (d) => 2021 - d.birth,
          y: (d) => (d.gender === 'M' ? 1 : -1),
          color: 'gender',
          shape: 'point',
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
