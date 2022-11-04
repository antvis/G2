import type { G2Spec } from '@/spec';

export function irisPointShapes(): G2Spec {
  return {
    type: 'point',
    width: 1152,
    height: 600,
    data: {
      type: 'fetch',
      value: 'data/iris.csv',
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'category',
      color: 'category',
    },
    scale: {
      shape: { range: ['point', 'plus', 'diamond'] },
    },
    style: {
      r: 5,
    },
  };
}
