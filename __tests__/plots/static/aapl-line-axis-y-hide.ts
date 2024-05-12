import { G2Spec } from '../../../src';

export function aaplLineAxisYHide(): G2Spec {
  return {
    type: 'line',
    height: 200,
    data: {
      type: 'fetch',
      value: 'data/aapl.csv',
    },
    encode: {
      x: 'date',
      y: 'close',
    },
    axis: {
      x: false,
      y: { labelFormatter: (d) => `${d}000`, transform: [{ type: 'hide' }] },
    },
  };
}
