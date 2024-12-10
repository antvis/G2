import { G2Spec } from '../../../src';

export function alphabetLineSortX(): G2Spec {
  return {
    type: 'line',
    transform: [
      { type: 'groupX', y: 'sum' },
      { type: 'sortX', by: 'y', reverse: true },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
      format: 'csv',
    },
    axis: {},
    encode: {
      x: 'state',
      y: 'population',
    },
  };
}
