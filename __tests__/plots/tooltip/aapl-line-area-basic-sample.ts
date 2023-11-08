import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLineAreaBasicSample(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    children: [
      {
        type: 'area',
        encode: {
          x: 'date',
          y: 'close',
        },
        transform: [
          {
            type: 'sample',
            thresholds: 100,
            strategy: 'lttb',
          },
        ],
        style: {
          fillOpacity: 0.5,
        },
        tooltip: {
          title: (d) => new Date(d.date).toUTCString(),
        },
      },
    ],
  };
}

aaplLineAreaBasicSample.steps = seriesTooltipSteps([500, 200]);
