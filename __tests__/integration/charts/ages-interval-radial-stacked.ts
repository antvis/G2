import type { G2Spec } from '@/spec';

export function agesIntervalRadialStacked(): G2Spec {
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
          as: ['Age', 'Population'],
        },
      ],
    },
    transform: [{ type: 'stackY' }],
    coordinate: [{ type: 'polar', innerRadius: 0.4 }],
    scale: {
      color: { range: colors },
      y: { type: 'sqrt' },
    },
    axis: {
      y: {
        direction: 'center',
        tickFilter: (_, i) => i !== 0,
        tickFormatter: '~s',
      },
      x: { position: 'bottom' },
    },
    legend: {
      color: { position: 'center', title: null, dx: 64, dy: 44 },
    },
    encode: {
      x: 'State',
      y: 'Population',
      color: 'Age',
    },
  };
}
