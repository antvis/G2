import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function reverseScaleRange(): G2Spec {
  return {
    type: 'interval',
    autoFit: true,
    data: {
      type: 'fetch',
      value: 'data/population.csv',
      transform: [{ type: 'filter', callback: (d) => d.year === 2000 }],
    },
    encode: {
      x: 'age',
      y: (d) => (d.sex === 1 ? -d.people : d.people),
      color: 'sex',
    },
    scale: { color: { type: 'ordinal' }, x: { range: [1, 0] } },
    coordinate: { transform: [{ type: 'transpose' }] },
    axis: { y: { labelFormatter: '~s' } },
    legend: { color: { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') } },
    tooltip: {
      items: [
        (d) => ({
          value: d.people,
          name: d.sex === 1 ? 'Male' : 'Female',
        }),
      ],
    },
  };
}

reverseScaleRange.steps = tooltipSteps(0);
