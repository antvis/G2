import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function stateAgesIntervalShared(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'interval',
        padding: 0,
        transform: [
          { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
          { type: 'dodgeX' },
        ],
        data: {
          type: 'fetch',
          value: 'data/stateages.csv',
        },
        legend: false,
        encode: {
          x: 'state',
          y: 'population',
          color: 'age',
        },
      },
    ],
    interaction: {
      tooltip: {
        shared: true,
      },
    },
  };
}

stateAgesIntervalShared.steps = tooltipSteps(0);
