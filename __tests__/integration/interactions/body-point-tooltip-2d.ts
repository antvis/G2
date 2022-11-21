import { G2Spec } from '../../../src';

export function bodyPointTooltip2d(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value: 'data/body.json',
        },
        axis: false,
        legend: false,
        encode: {
          x: 'height',
          y: 'weight',
          color: 'gender',
        },
      },
    ],
    style: {
      viewFill: 'steelblue',
      mainFill: 'white',
    },
    interactions: [{ type: 'tooltip' }],
  };
}

bodyPointTooltip2d.skip = true;
