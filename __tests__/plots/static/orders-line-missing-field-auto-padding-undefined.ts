import { G2Spec } from '../../../src';
import { orders } from '../../data/orders';

export function ordersLineMissingFieldAutoPaddingUndefined(): G2Spec {
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
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
