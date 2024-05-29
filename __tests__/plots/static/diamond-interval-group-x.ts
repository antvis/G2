import { G2Spec } from '../../../src';

export function diamondIntervalGroupX(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/diamond.csv',
    },
    encode: {
      x: 'clarity',
      y: 'price',
    },
    labels: [
      {
        text: (_, index, __, channels) => channels.y[index],
      },
    ],
    transform: [{ type: 'groupX', y: 'max' }],
    style: {
      fill: (_, index, __, channels) =>
        channels.y[index] < 11700 ? 'red' : 'blue',
    },
  };
}
