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
      color: { type: 'sequential', palette: 'reds' },
    },
    encode: {
      x: 'date',
      y: ['low', 'high'],
      shape: 'step',
      color: (d) => d.high - d.low,
      series: () => undefined,
    },
    style: {
      gradient: 'x',
    },
  };
}

temperatures3AreaBandGradient.maxError = 450;
