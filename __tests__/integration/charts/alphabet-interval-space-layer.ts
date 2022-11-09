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
        paddingLeft: 50,
        transform: [{ type: 'sortX', by: 'y', reverse: true }],
        axis: {
          y: { tickFormatter: '.0%' },
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
        paddingLeft: 400,
        paddingBottom: 200,
        coordinate: [{ type: 'theta' }],
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
