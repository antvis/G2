import { G2Spec } from '../../../src';
import { temperatures } from '../data/temperatures';

export function temperaturesLinePointTooltipDiscrete(): G2Spec {
  return {
    type: 'view',
    data: temperatures,
    children: [
      {
        type: 'line',
        encode: {
          x: 'month',
          y: 'temperature',
          color: 'city',
        },
      },
      {
        type: 'point',
        encode: {
          x: 'month',
          y: 'temperature',
          color: 'city',
          tooltip: null,
          title: null,
        },
        style: {
          fill: 'white',
        },
      },
    ],
    interactions: [{ type: 'tooltip' }],
  };
}

temperaturesLinePointTooltipDiscrete.skip = true;
