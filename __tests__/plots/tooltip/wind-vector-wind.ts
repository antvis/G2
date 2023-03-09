import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function windVectorWind(): G2Spec {
  return {
    width: 800,
    height: 600,
    type: 'vector',
    data: {
      type: 'fetch',
      value: 'data/wind.csv',
    },
    encode: {
      x: 'longitude',
      y: 'latitude',
      rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
      size: ({ u, v }) => Math.hypot(v, u),
      color: ({ u, v }) => Math.hypot(v, u),
    },
    scale: {
      size: { range: [4, 20] },
      color: {
        palette: 'viridis',
      },
    },
    axis: {
      x: { grid: false },
      y: { grid: false },
    },
    legend: false,
  };
}

windVectorWind.steps = tooltipSteps(0);
