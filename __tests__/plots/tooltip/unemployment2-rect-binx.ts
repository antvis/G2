import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function unemployment2RectBinX(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/unemployment2.csv',
    },
    transform: [{ type: 'binX', y: 'count' }],
    encode: {
      x: 'rate',
    },
    style: {
      inset: 0.5,
    },
  };
}

unemployment2RectBinX.steps = tooltipSteps(0);
