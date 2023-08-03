import { G2Spec } from '../../../src';

export function cars2PointConstantColorSize(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    encode: {
      y: 'Miles_per_Gallon',
      x: 'Horsepower',
      size: 'Origin',
    },
    scale: {
      x: { nice: true },
      y: { nice: true },
    },
  };
}
