import { G2Spec } from '../../../src';

export function commitsPointGroupedConstant(): G2Spec {
  return {
    type: 'point',
    height: 300,
    inset: 10,
    data: {
      type: 'fetch',
      value: 'data/commits.csv',
    },
    axis: {
      x: { title: 'time (hours)' },
      y: { title: 'time (day)', grid: true },
    },
    legend: { size: false },
    scale: {
      y: { type: 'point' },
      x: { tickCount: 24 },
      color: { palette: 'rdBu' },
    },
    encode: {
      x: (d) => d.time.getUTCHours(),
      y: (d) => d.time.getUTCDay(),
      color: 'steelblue',
      shape: 'point',
    },
    transform: [
      { type: 'group', size: 'count', color: 'count' },
      { type: 'sortY' },
    ],
    frame: true,
  };
}
