import { G2Spec } from '../../../src';

export function salaryHeatmapScaleThreshold(): G2Spec {
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
        type: 'threshold',
        domain: [10000, 100000],
        // only rgb and hex values are supported
        range: ['#eeeeee', '#ffc3ce', '#ff0d0d'],
      },
    },
    legend: {
      color: {
        labelFormatter: (datum: any) => datum.label / 1000 + 'K',
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
