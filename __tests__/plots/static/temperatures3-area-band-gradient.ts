import { G2Spec } from '../../../src';

export function temperatures3AreaBandGradient(): G2Spec {
  return {
    type: 'area',
    width: 900,
    data: {
      type: 'fetch',
      value: 'data/temperatures3.csv',
    },
    scale: {
      color: { palette: 'reds' },
    },
    legend: false,
    encode: {
      x: 'date',
      y: ['low', 'high'],
      shape: 'hvh',
      color: (d) => d.high - d.low,
      series: () => undefined,
    },
    style: {
      gradient: 'x',
    },
  };
}
