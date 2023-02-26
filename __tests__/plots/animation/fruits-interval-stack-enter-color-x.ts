import { G2Spec } from '../../../src';
import { fruits } from '../../data/fruits';

export function fruitsIntervalStackEnterColorX(): G2Spec {
  return {
    type: 'interval',
    data: fruits,
    transform: [{ type: 'stackEnter', groupBy: ['color', 'x'] }],
    encode: {
      x: 'year',
      y: 'value',
      color: 'type',
      series: 'type',
      enterDuration: 1000,
    },
    animate: {
      enter: {
        duration: 600,
      },
    },
  };
}

fruitsIntervalStackEnterColorX.intervals = [[1000, 2000, 3000, 4000, 5000]];
