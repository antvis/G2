import { G2Spec } from '../../../src';
export function weatherLineMatrixCol(): G2Spec {
  return {
    type: 'matrix',
    width: 300,
    height: 720,
    paddingLeft: 50,
    paddingBottom: 60,
    data: {
      type: 'fetch',
      value: 'data/weather.csv',
      transform: [
        {
          type: 'map',
          callback: ({ date, ...d }) => ({
            ...d,
            date: date.getMonth() + '',
          }),
        },
      ],
    },
    encode: {
      y: ['temp_max', 'precipitation', 'wind'],
      x: 'date',
    },
    children: [
      {
        type: 'line',
        transform: [{ type: 'groupX', y: 'mean' }],
        encode: {
          color: 'location',
        },
        scale: {
          y: { zero: true },
        },
      },
    ],
  };
}
