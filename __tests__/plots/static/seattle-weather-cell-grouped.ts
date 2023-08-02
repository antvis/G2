import { G2Spec } from '../../../src';

export function settleWeatherCellGrouped(): G2Spec {
  return {
    type: 'cell',
    height: 300,
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
    scale: {
      x: { compare: (a, b) => +a - +b },
      y: { compare: (a, b) => +a - +b },
    },
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    style: { inset: 0.5 },
  };
}
