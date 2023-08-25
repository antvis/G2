import { G2Spec } from '../../../src';
import { orders } from '../../data/orders';

export function ordersLineMissingField(): G2Spec {
  return {
    type: 'line',
    data: orders,
    encode: {
      x: 'hour',
      y: 'new_recharge_orders',
      color: 'date',
    },
    axis: {
      x: { labelFormatter: (d) => (d === undefined ? '' : d) },
    },
  };
}
