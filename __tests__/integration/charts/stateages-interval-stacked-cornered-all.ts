import { G2Spec } from '../../../src';

export function stateAgesIntervalStackedCorneredAll(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 50,
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
      y: { tickFormatter: '~s' },
    },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    style: {
      radiusTop: true,
      radiusBottom: true,
      radiusTopLeft: 25,
      radiusTopRight: 20,
      radiusBottomLeft: 15,
      radiusBottomRight: 10,
    },
  };
}
