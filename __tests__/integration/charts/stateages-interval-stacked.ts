import { G2Spec } from '../../../src';

export function stateAgesIntervalStacked(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 50,
    width: 800,
    transform: [
      { type: 'sortX', channel: 'y', reverse: true },
      { type: 'stackY' },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    scale: {
      y: { formatter: '~s' },
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
  };
}
