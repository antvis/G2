import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLine(): G2Spec {
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
          title: (d) => new Date(d.date).toUTCString(),
        },
      },
    ],
    interaction: {
      tooltip: true,
    },
  };
}

aaplLine.steps = seriesTooltipSteps([200, 300]);
