import * as d3 from 'd3-random';
import { G2Spec } from '../../../src';

export function cars2PointJitterY(): G2Spec {
  const random = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    scale: {
      y: { type: 'point' },
      color: { type: 'ordinal' },
    },
    transform: [{ type: 'sortY' }, { type: 'jitterY', random }],
    encode: {
      y: 'Cylinders',
      x: 'Horsepower',
      color: 'Cylinders',
    },
  };
}
