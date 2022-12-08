import { G2Spec } from '../../../src';
import { sold } from '../data/sold';

export function soldIntervalPieKeyframe(): G2Spec {
  return {
    type: 'timingKeyframe',
    direction: 'alternate',
    iterationCount: 2,
    children: [
      {
        type: 'interval',
        data: sold,
        coordinates: [{ type: 'theta', innerRadius: 0.45, outerRadius: 0.8 }],
        transform: [{ type: 'stackY' }],
        encode: {
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
        labels: [
          {
            text: 'sold',
          },
        ],
        animate: {
          enterType: 'waveIn',
        },
      },
      {
        type: 'interval',
        data: sold.slice(0, 4),
        coordinates: [{ type: 'theta', innerRadius: 0.45, outerRadius: 0.8 }],
        transform: [{ type: 'stackY' }],
        encode: {
          y: 'sold',
          color: 'genre',
          key: 'genre',
        },
        labels: [
          {
            text: 'sold',
          },
        ],
        animate: {
          enterType: 'waveIn',
        },
      },
    ],
  };
}

soldIntervalPieKeyframe.intervals = [false, [500], [500], [500], [500]];
