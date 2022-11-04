import { profit } from '../data/profit';
import type { G2Spec } from '@/spec';

export function profitIntervalRange(): G2Spec {
  return {
    type: 'interval',
    paddingLeft: 60,
    data: profit,
    axis: { y: { tickFormatter: '~s' } },
    encode: {
      x: 'month',
      y: ['end', 'start'],
      color: (d) =>
        d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
    },
  };
}
