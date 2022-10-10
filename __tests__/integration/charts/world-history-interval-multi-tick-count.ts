import { G2Spec } from '../../../src';

export function worldHistoryIntervalMultiTickCount(): G2Spec {
  const tickFormatter = (d) => Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');
  const left = (d) => d.end > -1500 && d.start > -3000;
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/world-history.csv',
    },
    width: 900,
    height: 1000,
    paddingRight: 80,
    coordinate: [{ type: 'transpose' }],
    transform: [{ type: 'sortX', channel: 'y' }],
    axis: {
      y: [
        {
          tickCount: 5,
          tickFormatter,
          grid: null,
          title: null,
          labelTextAlign: 'start',
        },
        {
          position: 'top',
          tickFormatter,
          title: null,
          labelTextAlign: 'start',
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
      color: { palette: 'set3' },
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
