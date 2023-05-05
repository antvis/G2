import { G2Spec } from '../../../src';

export function bodyPointScatterPlotSizeOpacity(): G2Spec {
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
      opacity: 'weight',
    },
    legend: {
      color: {
        size: 200,
        layout: { justifyContent: 'center' },
      },
    },
  };
}

bodyPointScatterPlotSizeOpacity.maxError = 100;
