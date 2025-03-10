import { G2Spec } from '../../../src';
import { seriesTooltipSteps, tooltipSteps } from './utils';

export function itemsCallback(): G2Spec {
  return {
    data: [
      { time: '10:10', waiting: 2, people: 2, s: '0' },
      { time: '10:10', waiting: 4, people: 5, s: '1' },
      { time: '10:15', waiting: 6, people: 2, s: '0' },
      { time: '10:15', waiting: 8, people: 8, s: '1' },
    ],
    type: 'line',
    encode: { x: 'time', y: 'waiting', series: 's', color: 's' },
    tooltip: {
      items: [
        (d, index, data, column) => {
          return {
            name: 'lineName',
            value: 'lineValue',
          };
        },
      ],
    },
  };
}

itemsCallback.steps = tooltipSteps(0);
