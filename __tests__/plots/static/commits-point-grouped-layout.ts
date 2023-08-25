import { G2Spec } from '../../../src';

export function commitsPointGroupedLayout(): G2Spec {
  return {
    type: 'view',
    height: 300,
    paddingLeft: 50,
    paddingBottom: 60,
    paddingRight: 30,
    paddingTop: 20,
    marginLeft: 40,
    marginTop: 30,
    marginRight: 20,
    marginBottom: 10,
    insetLeft: 10,
    insetTop: 20,
    insetRight: 30,
    insetBottom: 40,
    children: [
      {
        type: 'point',
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
        },
        legend: false,
        transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
        encode: {
          x: (d) => d.time.getUTCHours(),
          y: (d) => d.time.getUTCDay(),
          size: 'count',
          shape: 'point',
        },
        style: {
          fill: '#59a14f',
        },
      },
    ],
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
