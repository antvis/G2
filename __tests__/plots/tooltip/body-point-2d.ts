import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function bodyPoint2d(): G2Spec {
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
  };
}

bodyPoint2d.steps = tooltipSteps(0);
