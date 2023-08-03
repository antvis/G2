import { G2Spec } from '../../../src';

export function stocksLineAggregateLabel(): G2Spec {
  return {
    type: 'line',
    insetRight: 40,
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
        transform: [{ type: 'overlapDodgeY' }],
        style: {
          fontSize: 10,
        },
      },
    ],
  };
}
