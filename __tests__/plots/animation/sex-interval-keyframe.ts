import { G2Spec } from '../../../src';
import { sex } from '../../data/sex';

export function sexIntervalKeyframe(): G2Spec {
  return {
    type: 'timingKeyframe',
    direction: 'alternate',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data: sex,
        transform: [{ type: 'groupX', y: 'sum' }],
        encode: {
          x: 'city',
          y: 'value',
          key: 'city',
        },
      },
      {
        type: 'interval',
        data: sex,
        transform: [{ type: 'dodgeX' }],
        encode: {
          x: 'city',
          y: 'value',
          color: 'sex',
          groupKey: 'city',
        },
      },
    ],
  };
}

sexIntervalKeyframe.intervals = [false, [500], [500], [500], [500]];

// @todo Unexpected and unstable snapshots.
sexIntervalKeyframe.skip = true;
