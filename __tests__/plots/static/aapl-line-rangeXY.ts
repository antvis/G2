import { G2Spec } from '../../../src';

export function aaplLineRrangeXY(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'line',
        data: {
          type: 'fetch',
          value: 'data/aapl.csv',
        },
        encode: { x: 'date', y: 'close' },
      },
      {
        type: 'rangeX',
        data: [new Date('2010'), new Date('2011')],
      },
      {
        type: 'rangeY',
        data: [
          [350, 400],
          [500, 600],
        ],
      },
    ],
  };
}
