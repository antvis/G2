import { G2Spec } from '../../../src';

export function stocksLineVarSize(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    encode: {
      x: (d) => new Date(d.date),
      y: 'price',
      color: 'symbol',
      size: 'price',
    },
    legend: { size: false },
    style: { shape: 'trail' },
  };
}
