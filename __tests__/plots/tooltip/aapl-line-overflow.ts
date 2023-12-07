import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLineOverflow(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
        },
        encode: {
          x: 'date',
          y: 'close',
        },
        tooltip: {
          title: (d) => new Date(d.date).toUTCString(),
        },
      },
      {
        type: 'text',
        style: {
          x: 0,
          y: 0,
          text: 'hello world',
          textAlign: 'end',
        },
      },
    ],
  };
}

aaplLineOverflow.steps = seriesTooltipSteps([200, 300]);
