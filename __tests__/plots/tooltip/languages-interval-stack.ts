import { G2Spec } from '../../../src';
import { languages } from '../../data/languages';
import { tooltipSteps } from './utils';

export function languagesIntervalStack(): G2Spec {
  return {
    type: 'interval',
    data: languages,
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta', innerRadius: 0.25, outerRadius: 0.8 },
    encode: {
      y: 'value',
      color: 'id',
    },
  };
}

languagesIntervalStack.steps = tooltipSteps(1);
