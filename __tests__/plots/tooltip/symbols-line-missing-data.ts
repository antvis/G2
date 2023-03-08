import { G2Spec } from '../../../src';
import { symbols } from '../../data/symbols';
import { seriesTooltipSteps } from './utils';

export function symbolsLineMissingData(): G2Spec {
  return {
    type: 'line',
    data: symbols,
    encode: {
      x: 'date',
      y: 'close',
      color: 'symbol',
    },
  };
}

symbolsLineMissingData.steps = seriesTooltipSteps([200, 300], [400, 300]);
