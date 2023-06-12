import { G2Spec } from '../../../src';

export function mockAxisXYPolar(): G2Spec {
  return {
    type: 'view',
    padding: 'auto',
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
        style: {
          labelFontSize: 14,
          gridLineWidth: 10,
          gridStroke: 'red',
        },
      },
    ],
  };
}
