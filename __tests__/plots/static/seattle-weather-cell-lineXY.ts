import { G2Spec } from '../../../src';

export function settleWeatherCellLineXY(): G2Spec {
  return {
    type: 'view',
    height: 325,
    children: [
      {
        type: 'cell',
        data: {
          type: 'fetch',
          value: 'data/seattle-weather.csv',
        },
        encode: {
          x: (d) => new Date(d.date).getUTCDate(),
          y: (d) => new Date(d.date).getUTCMonth(),
          color: 'temp_max',
        },
        transform: [{ type: 'group', color: 'max' }],
        style: { inset: 0.5 },
      },
      {
        type: 'lineY',
        data: [4],
        style: { stroke: 'red', lineWidth: 4, bandOffset: 0.5 },
      },
      {
        type: 'lineX',
        data: [4],
        style: { stroke: 'red', lineWidth: 4, bandOffset: 0.5 },
      },
    ],
  };
}
