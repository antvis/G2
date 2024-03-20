import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetText(): G2Spec {
  return {
    type: 'text',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    encode: {
      x: 'letter',
      y: 'frequency',
      text: 'letter',
    },
  };
}

alphabetText.steps = tooltipSteps(0);
