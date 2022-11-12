import { G2Spec } from '../../../src';

export function temperature2LineGradientColor(): G2Spec {
  return {
    type: 'line',
    width: 1000,
    data: {
      type: 'fetch',
      value: 'data/temperatures2.csv',
    },
    scale: {
      y: { nice: true },
      x: { utc: true },
      color: { palette: 'turbo' },
    },
    legend: false,
    encode: {
      x: 'date',
      y: 'value',
      shape: 'hvh',
      color: 'value',
      series: () => undefined,
    },
    style: {
      gradient: 'y',
      lineWidth: 2,
      lineJoin: 'round',
    },
  };
}
