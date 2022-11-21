import { G2Spec } from '../../../src';

export function stateAgesIntervalTooltipShared(): G2Spec {
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
        axis: false,
        legend: false,
        encode: {
          x: 'state',
          y: 'population',
          color: 'age',
        },
      },
    ],
    interactions: [{ type: 'tooltip', shared: true }],
  };
}

stateAgesIntervalTooltipShared.skip = true;
