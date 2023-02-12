import { G2Spec } from '../../../src';

export function seattleWeatherCellSpaceFlex(): G2Spec {
  return {
    type: 'spaceFlex',
    width: 900,
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    direction: 'col',
    ratio: [1, 2],
    children: [
      {
        type: 'interval',
        paddingBottom: 0,
        paddingRight: 300,
        transform: [{ type: 'groupX', y: 'max' }],
        axis: { x: false },
        encode: {
          x: (d) => new Date(d.date).getUTCDate(),
          y: 'temp_max',
          color: 'steelblue',
        },
      },
      {
        type: 'spaceFlex',
        ratio: [2, 1],
        children: [
          {
            type: 'cell',
            paddingRight: 0,
            paddingBottom: 50,
            transform: [{ type: 'group', color: 'max' }],
            encode: {
              x: (d) => new Date(d.date).getUTCDate(),
              y: (d) => new Date(d.date).getUTCMonth(),
              color: 'temp_max',
            },
            style: {
              inset: 0.5,
            },
            axis: {
              x: { title: 'Date' },
              y: { title: 'Month' },
            },
            scale: {
              color: {
                palette: 'gnBu',
              },
            },
            legend: false,
          },
          {
            type: 'interval',
            paddingBottom: 50,
            transform: [{ type: 'groupX', y: 'max' }],
            coordinate: { transform: [{ type: 'transpose' }] },
            axis: { x: false },
            encode: {
              x: (d) => new Date(d.date).getUTCMonth(),
              y: 'temp_max',
              color: 'steelblue',
            },
          },
        ],
      },
    ],
  };
}
