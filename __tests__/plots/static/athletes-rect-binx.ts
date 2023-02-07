import { G2Spec } from '../../../src';

export function athletesRectBinX(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/athletes.csv',
    },
    transform: [
      { type: 'binX', y: 'count' },
      { type: 'stackY', orderBy: 'series' },
    ],
    encode: {
      x: 'weight',
      color: 'sex',
    },
    style: {
      inset: 0.5,
    },
  };
}
