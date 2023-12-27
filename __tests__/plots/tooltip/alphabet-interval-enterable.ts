import { CustomEvent } from '@antv/g';
import { G2Spec, PLOT_CLASS_NAME } from '../../../src';
import { tooltipSteps } from './utils';

export function alphabetIntervalEnterable(): G2Spec {
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
        axis: false,
        legend: false,
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'steelblue',
        },
        interaction: {
          tooltip: {
            enterable: true,
          },
        },
      },
    ],
  };
}

// TOOD: this test case does not test the `enterable` feature.
alphabetIntervalEnterable.steps = tooltipSteps(0);
