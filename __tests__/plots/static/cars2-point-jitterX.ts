import * as d3 from 'd3-random';
import { G2Spec } from '../../../src';

export function cars2PointJitterX(): G2Spec {
  const random = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    scale: {
      x: { type: 'point' },
      color: { type: 'ordinal' },
    },
    transform: [{ type: 'sortX' }, { type: 'jitterX', random }],
    encode: {
      y: 'Horsepower',
      x: 'Cylinders',
      color: 'Cylinders',
    },
  };
}
