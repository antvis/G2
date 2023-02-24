import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetIntervalFull(): G2Spec {
  return {
    type: 'interval',
    padding: 0,
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    axis: false,
    legend: false,
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    tooltip: {
      title: { channel: 'color' },
      items: ['letter', 'frequency'],
    },
    interaction: { tooltip: true },
  };
}

alphabetIntervalFull.steps = tooltipSteps(0);
