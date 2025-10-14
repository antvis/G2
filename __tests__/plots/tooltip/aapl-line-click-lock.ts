import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLineClickLock(): G2Spec {
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
        interaction: {
          tooltip: {
            clickLock: true,
          },
        },
      },
    ],
  };
}

aaplLineClickLock.steps = seriesTooltipSteps([200, 300]);
