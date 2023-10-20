import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function stateAgesIntervalScrollbar(): G2Spec {
  return {
    type: 'interval',
    transform: [
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    legend: false,
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    interaction: { tooltip: { shared: true } },
    scrollbar: { x: { ratio: 0.5 } },
  };
}

stateAgesIntervalScrollbar.steps = tooltipSteps(0);
