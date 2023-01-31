import { G2Spec } from '../../../src';

export function commitsPointGrouped(): G2Spec {
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
    scale: {
      y: { type: 'point' },
      x: { tickCount: 24 },
      color: {
        palette: 'rdBu',
      },
    },
    transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
    encode: {
      x: (d) => d.time.getUTCHours(),
      y: (d) => d.time.getUTCDay(),
      size: 'count',
      shape: 'point',
      color: 'count',
    },
    frame: true,
  };
}
