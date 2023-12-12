import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function oneElementLine(): G2Spec {
  return {
    width: 800,
    type: 'line',
    data: {
      value: [
        {
          date: '2007-04-23T00:00:00.000Z',
          close: 93.24,
        },
      ],
    },
    encode: {
      x: 'date',
      y: 'close',
      size: 10,
    },
    tooltip: {
      title: 'date',
      items: ['close'],
    },
  };
}

oneElementLine.steps = seriesTooltipSteps([200, 200]);
