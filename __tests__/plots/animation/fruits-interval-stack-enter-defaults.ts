import { G2Spec } from '../../../src';
import { fruits } from '../../data/fruits';

export function fruitsIntervalStackEnterDefaults(): G2Spec {
  return {
    type: 'interval',
    data: fruits,
    transform: [{ type: 'stackEnter' }],
    encode: {
      x: 'year',
      y: 'value',
      color: 'type',
      series: 'type',
      enterDuration: 1000,
    },
    animate: {
      enter: {
        duration: 1000,
      },
    },
  };
}

fruitsIntervalStackEnterDefaults.intervals = [[1000]];
