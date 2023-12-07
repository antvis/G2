import { G2Spec } from '../../../src';

export function bodyPointScatterPlotOpacity(): G2Spec {
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/body.json',
    },
    encode: {
      x: 'height',
      y: 'weight',
      opacity: 'weight',
    },
    legend: {
      opacity: {},
    },
  };
}
