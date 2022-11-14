import { G2Spec } from '../../../src';

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
      size: 5,
    },
    scale: {
      shape: { range: ['point', 'plus', 'diamond'] },
    },
  };
}
