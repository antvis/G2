import { G2Spec } from '../../../src';

export function alphabetIntervalAxis(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: 'interval',
        transform: [{ type: 'sortX', by: 'y', reverse: true }],
        data: {
          type: 'fetch',
          value: 'data/alphabet.csv',
        },
        encode: {
          x: 'letter',
          y: 'frequency',
          color: 'steelblue',
        },
        axis: { y: { tickCount: 10 }, x: false },
      },
      { type: 'axisX', title: 'Letter', labelFontSize: 20 },
      {
        type: 'axisY',
        labelFormatter: '.0%',
        title: 'Frequency',
        scale: { y: { nice: true } },
      },
      {
        type: 'axisY',
        position: 'right',
        scale: {
          y: {
            type: 'linear',
            independent: true,
            domain: [0, 10],
            range: [1, 0],
          },
        },
        grid: false,
      },
    ],
  };
}
