import { G2Spec } from '../../../src';
import { temperatures } from '../data/temperatures';

export function temperaturesLineTooltipDiscrete(): G2Spec {
  return {
    type: 'line',
    data: temperatures,
    encode: {
      x: 'month',
      y: 'temperature',
      color: 'city',
    },
    interactions: [{ type: 'tooltip', showCrosshairs: false }],
  };
}

temperaturesLineTooltipDiscrete.skip = true;
