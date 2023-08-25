import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetIntervalNullItems(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    tooltip: { items: null },
  };
}

alphabetIntervalNullItems.steps = tooltipSteps(0);
