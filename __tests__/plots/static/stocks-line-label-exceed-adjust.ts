import { G2Spec } from '../../../src';

export function stocksLineLabelExceedAdjust(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    transform: [{ type: 'groupX', y: 'mean' }],
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: 'price',
      color: 'symbol',
    },
    labels: [
      {
        text: 'price',
        transform: [{ type: 'exceedAdjust' }],
        style: {
          fontSize: 10,
        },
      },
    ],
  };
}
