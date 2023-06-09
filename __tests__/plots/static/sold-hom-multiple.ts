import { G2Spec } from '../../../src';
import { sold } from '../../data/sold';

function HOCMark(options) {
  const { encode, ...res } = options;
  return [
    {
      type: 'interval',
      ...res,
      encode: {
        ...encode,
        color: 'genre',
      },
    },
    {
      type: 'line',
      ...options,
    },
    {
      type: 'point',
      ...options,
    },
  ];
}

export function soldHOMMultiple(): G2Spec {
  return {
    type: 'view',
    data: sold,
    children: [
      {
        type: HOCMark,
        encode: {
          x: 'genre',
          y: 'sold',
        },
      },
    ],
  };
}
