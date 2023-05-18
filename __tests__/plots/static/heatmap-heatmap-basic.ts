import { G2Spec } from '../../../src';

export function HeatmapHeatmapBasic(): G2Spec {
  return {
    type: 'heatmap',
    padding: 0,
    data: {
      type: 'fetch',
      value: 'data/heatmap.json',
    },
    encode: {
      x: 'g',
      y: 'l',
      color: 'tmp',
    },
    axis: false,
  };
}

HeatmapHeatmapBasic.maxError = 100;
