import { G2Spec } from '../../../src';
import { fruits } from '../../data/fruits';

export function fruitsIntervalStackEnterColor(): G2Spec {
  return {
    type: 'interval',
    data: fruits,
    transform: [{ type: 'stackEnter', groupBy: 'color' }],
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

fruitsIntervalStackEnterColor.intervals = [[1500]];
