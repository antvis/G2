import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function morleyBoxChannel(): G2Spec {
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
        tooltip: [
          { name: 'min', channel: 'y' },
          { name: 'q1', channel: 'y1' },
          { name: 'q2', channel: 'y2' },
          { name: 'q3', channel: 'y3' },
          { name: 'max', color: 'red', channel: 'y4' },
        ],
      },
    ],
  };
}

morleyBoxChannel.steps = tooltipSteps(0);
