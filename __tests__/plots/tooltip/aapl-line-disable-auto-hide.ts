import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLineDisableAutoHide(): G2Spec {
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
            disableAutoHide: true,
          },
        },
      },
    ],
  };
}

aaplLineDisableAutoHide.steps = seriesTooltipSteps([200, 300]);
