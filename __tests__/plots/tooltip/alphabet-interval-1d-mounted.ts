import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetInterval1dMounted(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'interval',
        padding: 0,
        data: {
          type: 'fetch',
          value: 'data/alphabet.csv',
        },
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'steelblue',
        },
      },
    ],
  };
}

alphabetInterval1dMounted.steps = tooltipSteps(0);
alphabetInterval1dMounted.mounted = true;
