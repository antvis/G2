import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function aaplLineAreaBasicSampleMount(): G2Spec {
  return {
    width: 600,
    height: 400,
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
        interaction: {
          tooltip: {
            mount: 'body',
            bounding: {
              x: 100,
              y: 100,
              width: 500,
              height: 300,
            },
          },
        },
      },
    ],
  };
}

aaplLineAreaBasicSampleMount.steps = seriesTooltipSteps([100, 200], [550, 200]);
