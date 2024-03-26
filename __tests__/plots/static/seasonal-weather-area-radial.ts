import { G2Spec } from '../../../src';

export function seasonalWeatherAreaRadial(): G2Spec {
  return {
    type: 'view',
    width: 954,
    height: 954,
    data: {
      type: 'fetch',
      value: 'data/seasonal-weather.csv',
    },
    padding: 0,
    coordinate: { type: 'polar', innerRadius: 0.4 },
    axis: {
      y: {
        zIndex: 1,
        direction: 'center',
        title: false,
        labelFormatter: (d, i, array) =>
          i === array.length - 1 ? `${d}°F` : `${d}`,
        labelStroke: '#fff',
        labelLineWidth: 5,
      },
      x: {
        grid: true,
        position: 'inner',
        tickCount: 10,
      },
    },
    scale: { x: { utc: true } },
    children: [
      {
        type: 'area',
        encode: {
          x: 'date',
          y: ['minmin', 'maxmax'],
        },
        style: {
          fill: 'lightsteelblue',
          fillOpacity: 0.2,
        },
      },
      {
        type: 'area',
        encode: {
          x: 'date',
          y: ['min', 'max'],
        },
        style: {
          fill: 'steelblue',
          fillOpacity: 0.2,
        },
      },
      {
        type: 'line',
        encode: {
          x: 'date',
          y: 'avg',
        },
        style: {
          stroke: 'steelblue',
          lineWidth: 1.5,
        },
      },
    ],
  };
}
