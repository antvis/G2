import { G2Spec } from '../../../src';
import { sold } from '../../data/sold';

export function soldIntervalKeyframe(): G2Spec {
  return {
    type: 'timingKeyframe',
    direction: 'alternate',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data: sold,
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'steelblue',
          key: 'genre',
        },
      },
      {
        type: 'interval',
        data: sold.slice(0, 2),
        encode: {
          x: 'genre',
          y: 'sold',
          color: 'orange',
          key: 'genre',
        },
      },
    ],
  };
}

soldIntervalKeyframe.intervals = [false, [500], [500], [500], [500]];
