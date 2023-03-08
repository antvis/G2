import { G2Spec } from '../../../src';
import { value } from '../../data/value';
import { seriesTooltipSteps } from './utils';

export function valueAreaLineUnique(): G2Spec {
  return {
    type: 'view',
    data: value,
    encode: {
      x: 'year',
      y: 'value',
    },
    children: [{ type: 'area', style: { fillOpacity: 0.3 } }, { type: 'line' }],
  };
}

valueAreaLineUnique.steps = seriesTooltipSteps([200, 300]);
