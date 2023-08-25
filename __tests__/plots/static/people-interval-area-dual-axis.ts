import { G2Spec } from '../../../src';

export function peopleIntervalAreaDualAxis(): G2Spec {
  return {
    type: 'view',
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
    children: [
      {
        type: 'area',
        transform: [{ type: 'groupX', y: 'sum' }],
        encode: {
          x: 'age',
          y: 'people',
        },
        scale: {
          y: { nice: true },
        },
        style: {
          fill: '#85C5A6',
          fillOpacity: 0.3,
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'age',
          y: (d) => (d.sex === 1 ? d.people : -d.people),
          color: (d) => (d.sex === 1 ? 'male' : 'female'),
        },
        scale: {
          x: { type: 'band', padding: 0.7 },
          color: {
            domain: ['male', 'female'],
            range: ['#97e3d5', '#f47560'],
          },
        },
        style: {
          radius: 4,
        },
        axis: {
          y: {
            grid: false,
            title: 'People',
            titleFill: 'steelblue',
          },
        },
      },
    ],
  };
}
