import { G2Spec } from '../../../src';

/**
 * When only shape is mapped (no color), legend markers should match the shapes
 * used in the chart. Regression test for https://github.com/antvis/G2/issues/7286
 */
export function irisPointShapeOnlyLegend(): G2Spec {
  return {
    type: 'point',
    width: 640,
    height: 480,
    data: {
      type: 'fetch',
      value: 'data/iris.csv',
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'category',
      size: 5,
    },
  };
}
