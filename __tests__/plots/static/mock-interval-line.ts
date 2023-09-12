import { G2Spec } from '../../../src';

export function mockIntervalLine(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'interval',
        data: [
          { time: '2019-03', value: 350, type: 'uv' },
          { time: '2019-04', value: 900, type: 'uv' },
          { time: '2019-05', value: 300, type: 'uv' },
          { time: '2019-06', value: 450, type: 'uv' },
          { time: '2019-07', value: 470, type: 'uv' },
          { time: '2019-03', value: 220, type: 'bill' },
          { time: '2019-04', value: 300, type: 'bill' },
          { time: '2019-05', value: 250, type: 'bill' },
          { time: '2019-06', value: 220, type: 'bill' },
          { time: '2019-07', value: 362, type: 'bill' },
        ],
        encode: { x: 'time', y: 'value', color: 'type' },
        transform: [{ type: 'dodgeX' }],
        axis: { y: { labelFormatter: '.0%' } },
      },
      {
        type: 'line',
        data: [
          { time: '2019-03', count: 800 },
          { time: '2019-04', count: 600 },
          { time: '2019-05', count: 400 },
          { time: '2019-06', count: 380 },
          { time: '2019-07', count: 220 },
        ],
        encode: { x: 'time', y: 'count', color: () => 'line' },
        axis: { y: { labelFormatter: '.0%' } },
      },
    ],
  };
}
