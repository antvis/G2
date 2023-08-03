import { G2Spec } from '../../../src';

export function gdp2BoxplotLog(): G2Spec {
  return {
    type: 'boxplot',
    data: {
      type: 'fetch',
      value: 'data/gdp2.csv',
    },
    encode: {
      x: 'continent',
      y: 'Population',
    },
    scale: {
      y: { type: 'log', nice: true },
    },
    axis: {
      y: { labelFormatter: '~s', tickCount: 3 },
    },
  };
}
