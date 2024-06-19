import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export async function mockDualBarShareTooltip(): Promise<G2Spec> {
  return {
    type: 'view',
    data: [
      { time: '10:10', call: 4, waiting: 2, people: 2, mock: 3 },
      { time: '10:15', call: 2, waiting: 6, people: 3, mock: 4 },
      { time: '10:20', call: 13, waiting: 2, people: 5, mock: 1 },
      { time: '10:25', call: 9, waiting: 9, people: 1, mock: 2 },
      { time: '10:30', call: 5, waiting: 2, people: 3, mock: 5 },
      { time: '10:35', call: 8, waiting: 2, people: 1, mock: 3 },
      { time: '10:40', call: 13, waiting: 1, people: 2, mock: 2 },
    ],
    children: [
      {
        type: 'interval',
        encode: {
          x: 'time',
          y: 'waiting',
          color: () => 'waiting',
          series: () => 'waiting',
        },
        scale: { y: { nice: true } },
        axis: { y: { title: null } },
      },
      {
        type: 'interval',
        encode: {
          x: 'time',
          y: 'people',
          color: () => 'people',
          series: () => 'people',
        },
        scale: { y: { key: '2' } },
        axis: { y: { position: 'right', grid: null, title: null } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'call', color: () => 'call' },
        scale: { series: { independent: true } },
      },
      {
        type: 'line',
        encode: { x: 'time', y: 'mock', color: () => 'mock' },
        scale: { y: { key: '2' }, series: { independent: true } },
      },
    ],
  };
}

mockDualBarShareTooltip.steps = seriesTooltipSteps([200, 300]);
