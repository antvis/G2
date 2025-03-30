import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function issue6699Improve(): G2Spec {
  return {
    autoFit: true,
    data: [
      {
        time: '10:10',
        call: 4,
        waiting: null,
        people: null,
      },
      {
        time: '10:15',
        call: 2,
        waiting: null,
        people: 3,
      },
      {
        time: '10:20',
        call: 13,
        waiting: 2,
        people: 5,
      },
      {
        time: '10:25',
        call: 9,
        waiting: 9,
        people: 1,
      },
      {
        time: '10:30',
        call: 5,
        waiting: 6,
        people: 3,
      },
      {
        time: '10:35',
        call: 8,
        waiting: null,
        people: null,
      },
      {
        time: '10:40',
        call: 13,
        waiting: 3,
        people: 2,
      },
    ],
    type: 'view',
    children: [
      {
        encode: {
          x: 'time',
          y: 'waiting',
        },
        type: 'interval',
      },
      {
        encode: {
          x: 'time',
          y: 'people',
        },
        type: 'interval',
      },
      {
        encode: {
          x: 'time',
          y: 'call',
        },
        type: 'line',
      },
    ],
  };
}

issue6699Improve.steps = seriesTooltipSteps([100, 300], [200, 300]);
