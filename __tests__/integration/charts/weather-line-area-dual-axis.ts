import { G2Spec } from '../../../src';

export function weatherLineAreaDualAxis(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/weather.csv',
      transform: [
        { type: 'filterBy', fields: [['location', (d) => d === 'Seattle']] },
      ],
    },
    children: [
      {
        type: 'area',
        transform: [{ type: 'groupX', y: 'mean', y1: 'mean' }],
        encode: {
          x: (d) => d.date.getUTCMonth(),
          y: ['temp_max', 'temp_min'],
        },
        scale: { y: { nice: true } },
        axis: {
          y: { titleFill: '#85C5A6', title: 'Avg. Temperature (°C)' },
        },
        style: {
          fill: '#85C5A6',
          fillOpacity: 0.3,
        },
      },
      {
        type: 'line',
        transform: [{ type: 'groupX', y: 'mean' }],
        encode: {
          x: (d) => d.date.getMonth(),
          y: 'precipitation',
          shape: 'smooth',
        },
        style: {
          stroke: 'steelblue',
        },
        scale: {
          y: { independent: true },
        },
        axis: {
          y: {
            position: 'right',
            grid: null,
            title: 'Precipitation (inches)',
            titleFill: 'steelblue',
          },
        },
      },
    ],
  };
}
