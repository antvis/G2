import type { G2Spec } from '@/spec';

export function productIntervalStackedGrouped(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 60,
    data: {
      type: 'fetch',
      value: 'data/product.csv',
    },
    transform: [
      { type: 'dodgeX', groupBy: ['x', 'color'] },
      {
        type: 'stackY',
        groupBy: ['x', 'series'],
        orderBy: 'series',
        series: false,
      },
    ],
    encode: {
      x: 'product_type',
      y: 'order_amt',
      color: 'product_sub_type',
      series: 'sex',
    },
  };
}
