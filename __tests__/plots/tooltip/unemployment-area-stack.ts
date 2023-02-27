import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function unemploymentAreaStack(): G2Spec {
  return {
    width: 800,
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/unemployment-by-industry.csv',
    },
    transform: [{ type: 'stackY' }],
    encode: {
      x: 'date',
      y: 'unemployed',
      color: 'industry',
    },
    tooltip: { title: (d) => new Date(d.Date).toUTCString() },
    axis: { y: { labelFormatter: '~s' } },
    legend: false,
    interaction: {
      tooltip: {},
    },
  };
}

unemploymentAreaStack.steps = seriesTooltipSteps([200, 300]);
