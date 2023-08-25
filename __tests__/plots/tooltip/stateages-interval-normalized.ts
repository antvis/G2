import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function stateAgesIntervalNormalized(): G2Spec {
  return {
    type: 'interval',
    width: 800,
    height: 1000,
    legend: false,
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    coordinate: { transform: [{ type: 'transpose' }] },
    transform: [
      { type: 'stackY' },
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum' },
      { type: 'normalizeY' },
    ],
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
  };
}

stateAgesIntervalNormalized.steps = tooltipSteps(0);
