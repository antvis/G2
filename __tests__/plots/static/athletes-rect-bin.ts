import { G2Spec } from '../../../src';

export function athletesRectBin(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/athletes.csv',
    },
    transform: [{ type: 'bin', opacity: 'count' }],
    encode: {
      x: 'weight',
      y: 'height',
      color: 'sex',
    },
    legend: {
      opacity: false,
    },
    style: {
      inset: 0.5,
    },
  };
}
