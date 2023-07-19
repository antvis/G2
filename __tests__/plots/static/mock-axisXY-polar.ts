import { G2Spec } from '../../../src';

export function mockAxisXYPolar(): G2Spec {
  return {
    type: 'view',
    padding: 0,
    coordinate: { type: 'polar' },
    scale: {
      x: {
        type: 'linear',
        domain: [5, 10],
        range: [0, 1],
      },
      y: {
        type: 'linear',
        domain: [5, 10],
        range: [0, 1],
      },
    },
    children: [
      {
        type: 'axisX',
        title: 'AxisX',
        tickFilter: (_, i, ticks) => i && i !== ticks.length - 1,
      },
      {
        type: 'axisY',
        title: 'AxisY',
        labelFontSize: 14,
        gridLineWidth: 10,
        gridStroke: 'red',
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
