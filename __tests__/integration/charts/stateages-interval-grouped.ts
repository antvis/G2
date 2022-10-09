import { G2Spec } from '../../../src';

export function stateAgesIntervalGrouped(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 50,
    transform: [
      { type: 'sortX', channel: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    axis: {
      y: { tickFormatter: '~s' },
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
  };
}
