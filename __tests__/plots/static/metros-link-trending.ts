import { G2Spec } from '../../../src';

export function metrosLinkTrending(): G2Spec {
  return {
    type: 'link',
    data: {
      type: 'fetch',
      value: 'data/metros.json',
    },
    encode: {
      x: ['POP_1980', 'POP_2015'],
      y: ['R90_10_1980', 'R90_10_2015'],
      color: (d) => d.R90_10_2015 - d.R90_10_1980,
    },
    scale: {
      x: { type: 'log' },
    },
    style: {
      arrow: true,
      arrowSize: 6,
    },
    axis: {
      x: {
        labelFormatter: '~s',
        labelTransform: 'rotate(90)',
      },
    },
    legend: false,
  };
}
