import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function morleyBox(): G2Spec {
  const names = {
    tooltip: 'min',
    tooltip1: 'q1',
    tooltip2: 'q2',
    tooltip3: 'q3',
    tooltip4: 'max',
  };
  return {
    type: 'view',
    children: [
      {
        type: 'boxplot',
        inset: 6,
        data: {
          type: 'fetch',
          value: 'data/morley.csv',
        },
        encode: {
          x: 'Expt',
          y: 'Speed',
        },
        style: {
          boxFill: '#aaa',
          pointStroke: '#000',
        },
      },
    ],
    interactions: [
      {
        type: 'tooltip',
        item: ({ channel, value }) => ({
          name: names[channel],
          color: channel === 'tooltip4' ? 'red' : undefined,
          value: `${value / 1000}k`,
        }),
      },
    ],
  };
}

morleyBox.steps = tooltipSteps(0);
