import { G2Spec } from '../../../src';

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
    padding: 0,
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
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'polar', innerRadius: 0.4 },
    scale: {
      color: { range: colors },
      y: { type: 'sqrt' },
    },
    axis: {
      y: {
        direction: 'center',
        tickFilter: (_, i) => i !== 0,
        labelFormatter: '~s',
      },
      x: { position: 'inner' },
    },
    legend: { color: { position: 'center' } },
    encode: {
      x: 'State',
      y: 'Population',
      color: 'Age',
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
