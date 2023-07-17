import { G2Spec } from '../../../src';

export function fuelLineEncodePropagate(): G2Spec {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value: 'data/fuel.json',
    },
    encode: {
      x: (d) => new Date(d.year),
      y: 'value',
      color: 'category',
    },
    axis: { y: { labelFormatter: '~s' } },
    children: [
      { type: 'line' },
      {
        type: 'point',
        transform: [{ type: 'sample', thresholds: 50 }],
        encode: {
          shape: (d) => (d.category !== 'Gas fuel' ? 'primary' : 'second'),
        },
        scale: {
          shape: {
            domain: ['primary', 'second'],
            range: ['point', 'square'],
          },
          x: { utc: true },
        },
        legend: { shape: false },
        style: {
          stroke: '#fff',
        },
      },
    ],
  };
}
