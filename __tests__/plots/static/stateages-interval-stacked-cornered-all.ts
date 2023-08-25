import { G2Spec } from '../../../src';

export function stateAgesIntervalStackedCorneredAll(): G2Spec {
  return {
    type: 'interval',
    width: 800,
    transform: [
      { type: 'stackY', orderBy: 'sum' },
      { type: 'sortX', by: 'y', reverse: true, slice: 5 },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    style: {
      radiusTopLeft: 25,
      radiusTopRight: 20,
      radiusBottomRight: 15,
      radiusBottomLeft: 10,
      innerRadiusTopLeft: 5,
      innerRadiusTopRight: 10,
      innerRadiusBottomRight: 15,
      innerRadiusBottomLeft: 20,
    },
  };
}
