import { G2Spec } from '../../../src';

export function temperature1LineVarColor(): G2Spec {
  return {
    type: 'line',
    width: 1000,
    data: {
      type: 'fetch',
      value: 'data/temperatures1.csv',
    },
    scale: {
      y: { nice: true },
      color: {
        domain: ['CLR', 'FEW', 'SCT', 'BKN', 'OVC', 'VV '],
        range: [
          'deepskyblue',
          'lightskyblue',
          'lightblue',
          '#aaaaaa',
          '#666666',
          '#666666',
        ],
      },
    },
    axis: { x: false },
    encode: {
      x: 'date',
      y: 'value',
      shape: 'hvh',
      color: 'condition',
      series: () => 'a',
    },
    style: {
      gradient: 'x',
      lineWidth: 2,
    },
  };
}
