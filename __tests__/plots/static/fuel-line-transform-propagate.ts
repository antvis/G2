import { G2Spec } from '../../../src';

export function fuelLineTransformPropagate(): G2Spec {
  return {
    type: 'view',
    height: 320,
    data: {
      type: 'fetch',
      value: 'data/fuel.json',
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: (d) => new Date(d.year),
      y: 'value',
      color: 'category',
    },
    scale: { x: { utc: true } },
    axis: { y: { labelFormatter: '~s' } },
    children: [{ type: 'line' }, { type: 'area', style: { fillOpacity: 0.5 } }],
  };
}
