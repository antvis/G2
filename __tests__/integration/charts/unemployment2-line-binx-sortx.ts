import { G2Spec } from '../../../src';

export function unemployment2LineBinXSortX(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/unemployment2.csv',
    },
    transform: [
      { type: 'binX', y: 'count' },
      { type: 'sortX', strategy: 'quantitative' },
    ],
    encode: {
      x: 'rate',
    },
    style: {
      inset: 0.5,
    },
  };
}
