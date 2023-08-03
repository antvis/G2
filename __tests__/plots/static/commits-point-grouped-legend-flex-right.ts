import { G2Spec } from '../../../src';

export function commitsPointGroupedLegendFlexRight(): G2Spec {
  return {
    type: 'point',
    height: 300,
    inset: 10,
    frame: true,
    data: {
      type: 'fetch',
      value: 'data/commits.csv',
    },
    encode: {
      x: (d) => d.time.getUTCHours(),
      y: (d) => d.time.getUTCDay(),
      size: 'count',
      shape: 'point',
      color: 'count',
    },
    transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
    scale: {
      y: { type: 'point' },
      x: { tickCount: 24 },
      color: { palette: 'rdBu' },
    },
    axis: {
      x: { title: 'time (hours)' },
      y: { title: 'time (day)', grid: true },
    },
    legend: {
      color: { layout: { justifyContent: 'flex-end' } },
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
