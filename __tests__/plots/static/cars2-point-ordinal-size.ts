import { G2Spec } from '../../../src';

export function cars2PointOrdinalSize(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    encode: {
      y: 'Miles_per_Gallon',
      x: 'Horsepower',
      color: 'Origin',
      size: 'Origin',
      shape: 'point',
    },
    scale: {
      x: { nice: true },
      y: { nice: true },
      size: { rangeMax: 20 },
    },
  };
}
