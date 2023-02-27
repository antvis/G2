import { G2Spec } from '../../../src';
import { fruits } from '../../data/fruits';

export function fruitsIntervalStackEnterXColor(): G2Spec {
  return {
    type: 'interval',
    data: fruits,
    transform: [{ type: 'stackEnter', groupBy: ['x', 'color'] }],
    encode: {
      x: 'year',
      y: 'value',
      color: 'type',
      series: 'type',
      enterDuration: 1000,
    },
    animate: {
      enter: {
        duration: 900,
      },
    },
  };
}

fruitsIntervalStackEnterXColor.intervals = [[1000, 2000, 3000, 4000, 5000]];
