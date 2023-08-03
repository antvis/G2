import { G2Spec } from '../../../src';

export function weatherLineRepeatMatrixCol(): G2Spec {
  return {
    type: 'repeatMatrix',
    width: 300,
    height: 720,
    paddingLeft: 50,
    paddingBottom: 50,
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
