import { G2Spec } from '../../../src';

export function alphabetIntervalSpaceLayer(): G2Spec {
  return {
    type: 'spaceLayer',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'sortX', by: 'y', reverse: true }],
        axis: {
          y: { labelFormatter: '.0%' },
        },
        scale: {
          color: {
            palette: 'cool',
            offset: (t) => t * 0.8 + 0.1,
          },
        },
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'letter',
        },
      },
      {
        type: 'interval',
        x: 300,
        y: 50,
        width: 300,
        height: 300,
        coordinate: { type: 'theta' },
        transform: [{ type: 'stackY' }],
        encode: {
          y: 'frequency',
          color: 'letter',
        },
        legend: false,
        scale: {
          color: {
            palette: 'cool',
            offset: (t) => t * 0.8 + 0.1,
          },
        },
      },
    ],
  };
}
