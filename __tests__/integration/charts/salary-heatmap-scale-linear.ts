import { G2Spec } from '../../../src';

export function salaryHeatmapScaleLinear(): G2Spec {
  return {
    type: 'cell',
    width: 900,
    height: 300,
    data: {
      type: 'fetch',
      value: 'data/salary.json',
      transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
    },
    scale: {
      color: {
        type: 'linear',
        tickCount: 4,
        range: ['#eee', '#f00'],
      },
    },
    legend: {
      color: {
        layout: {
          justifyContent: 'flex-start',
        },
      },
    },
    encode: {
      y: (_, i) => (i % 5) + 1,
      x: (_, i) => ((i / 5) | 0) + 1,
      color: 'salary',
    },
    style: {
      stroke: '#000',
      inset: 2,
    },
  };
}
