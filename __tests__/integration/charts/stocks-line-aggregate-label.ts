import type { G2Spec } from '@/spec';

export function stocksLineAggregateLabel(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/stocks.csv',
    },
    transform: [
      {
        type: 'groupX',
        y: 'mean',
      },
    ],
    encode: {
      x: (d) => new Date(d.date).getFullYear(),
      y: 'price',
      color: 'symbol',
    },
    labels: [
      {
        text: 'price',
        fontSize: 10,
        transform: [{ type: 'dodgeY' }],
      },
    ],
  };
}
