import { G2Spec } from '../../../src';

export function settleWeatherCellGrouped(): G2Spec {
  return {
    type: 'cell',
    height: 300,
    data: {
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    },
    transform: [{ type: 'group', color: 'max' }],
    encode: {
      x: (d) => new Date(d.date).getUTCDate(),
      y: (d) => new Date(d.date).getUTCMonth(),
      color: 'temp_max',
    },
    style: {
      inset: 0.5,
    },
    scale: {
      color: {
        palette: 'gnBu',
      },
    },
  };
}
