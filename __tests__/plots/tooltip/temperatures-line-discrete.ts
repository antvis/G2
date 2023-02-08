import { G2Spec } from '../../../src';
import { temperatures } from '../../data/temperatures';
import { seriesTooltipSteps } from './utils';

export function temperaturesLineDiscrete(): G2Spec {
  return {
    type: 'line',
    data: temperatures,
    encode: {
      x: 'month',
      y: 'temperature',
      color: 'city',
    },
    interaction: {
      tooltip: { crosshairs: false },
    },
  };
}

temperaturesLineDiscrete.steps = seriesTooltipSteps([200, 300]);
