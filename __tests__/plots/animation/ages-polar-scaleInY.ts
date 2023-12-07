import { G2Spec } from '../../../src';

export async function agesPolarScaleInY(): Promise<G2Spec> {
  const colors = [
    '#98abc5',
    '#8a89a6',
    '#7b6888',
    '#6b486b',
    '#a05d56',
    '#d0743c',
    '#ff8c00',
  ];

  return {
    type: 'interval',
    width: 800,
    height: 800,
    data: {
      type: 'fetch',
      value: 'data/ages.csv',
      transform: [
        {
          type: 'fold',
          fields: [
            'Under 5 Years',
            '5 to 13 Years',
            '14 to 17 Years',
            '18 to 24 Years',
            '25 to 44 Years',
            '45 to 64 Years',
            '65 Years and Over',
          ],
          key: 'Age',
          value: 'Population',
        },
      ],
    },
    coordinate: { type: 'polar', innerRadius: 0.4 },
    transform: [{ type: 'stackY' }],
    encode: { x: 'State', y: 'Population', color: 'Age' },
    scale: { color: { range: colors }, y: { type: 'sqrt' } },
    legend: {
      color: {
        position: 'center',
        display: 'grid',
        gridCol: 1,
      },
    },
    axis: {
      y: {
        labelFormatter: '~s',
        tickFilter: (_, i) => i !== 0,
        direction: 'center',
      },
      x: {
        position: 'inner',
      },
    },
    animate: {
      enter: {
        type: 'scaleInY',
        duration: 2000,
      },
    },
  };
}

agesPolarScaleInY.intervals = [[]];
