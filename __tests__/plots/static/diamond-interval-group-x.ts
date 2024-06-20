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
        text: (_, index, __, { channel }) => channel.y[index],
      },
    ],
    transform: [{ type: 'groupX', y: 'max' }],
    style: {
      fill: (_, index, __, { channel }) =>
        channel.y[index] < 11700 ? 'red' : 'blue',
    },
  };
}
