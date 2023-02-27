import { G2Spec } from '../../../src';
import { profit } from '../../data/profit';

export async function profitIntervalRange(): Promise<G2Spec> {
  return {
    type: 'timingKeyframe',
    children: [
      {
        type: 'view',
        paddingLeft: 60,
        children: [
          {
            type: 'interval',
            key: 'interval',
            data: profit,
            axis: { y: { labelFormatter: '~s' } },
            encode: {
              x: 'month',
              y: ['end', 'start'],
              color: (d) =>
                d.month === 'Total'
                  ? 'Total'
                  : d.profit > 0
                  ? 'Increase'
                  : 'Decrease',
            },
          },
        ],
      },
      {
        type: 'view',
        paddingLeft: 60,
        children: [
          {
            type: 'interval',
            key: 'interval',
            data: profit,
            axis: { y: { labelFormatter: '~s' } },
            encode: {
              x: 'month',
              y: ['end', 'start'],
              color: (d) =>
                d.month === 'Total'
                  ? 'Total'
                  : d.profit > 0
                  ? 'Increase'
                  : 'Decrease',
            },
          },
          {
            type: 'rangeY',
            data: [{ y: [0, 2000000] }],
            encode: { y: 'y' },
            animate: {
              enter: { type: 'fadeIn' },
            },
          },
        ],
      },
    ],
  };
}

profitIntervalRange.intervals = [false, false, [500]];
