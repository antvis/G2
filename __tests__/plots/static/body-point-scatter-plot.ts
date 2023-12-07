import { G2Spec } from '../../../src';

export function bodyPointScatterPlot(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/body.json',
    },
    encode: {
      x: 'height',
      y: 'weight',
      size: 'weight',
      color: 'red',
    },
  };
}
