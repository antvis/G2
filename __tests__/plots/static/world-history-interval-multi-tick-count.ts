import { G2Spec } from '../../../src';

export function worldHistoryIntervalMultiTickCount(): G2Spec {
  const labelFormatter = (d) =>
    Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');
  const left = (d) => d.end > -1500 && d.start > -3000;
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/world-history.csv',
    },
    width: 900,
    height: 1000,
    coordinate: { transform: [{ type: 'transpose' }] },
    transform: [
      { type: 'sortX', by: 'y' },
      { type: 'sortColor', by: 'y', reducer: 'min' },
    ],
    axis: {
      y: [
        {
          tickCount: 5,
          labelFormatter,
          grid: false,
          title: false,
        },
        {
          position: 'top',
          labelFormatter,
          title: false,
        },
      ],
      x: false,
    },
    encode: {
      x: 'civilization',
      y: ['start', 'end'],
      color: 'region',
    },
    scale: {
      color: { palette: 'set2' },
    },
    labels: [
      {
        text: 'civilization',
        position: (d) => (left(d) ? 'left' : 'right'),
        textAlign: (d) => (left(d) ? 'end' : 'start'),
        dx: (d) => (left(d) ? -5 : 5),
        fontSize: 10,
      },
    ],
  };
}
