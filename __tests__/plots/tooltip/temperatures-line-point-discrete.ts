import { G2Spec } from '../../../src';
import { temperatures } from '../../data/temperatures';
import { seriesTooltipSteps } from './utils';

export function temperaturesLinePointDiscrete(): G2Spec {
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
        },
        tooltip: null,
        style: { fill: 'white' },
      },
    ],
  };
}

temperaturesLinePointDiscrete.steps = seriesTooltipSteps([200, 300]);
