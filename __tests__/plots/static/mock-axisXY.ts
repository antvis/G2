import { G2Spec } from '../../../src';

export function mockAxisXY(): G2Spec {
  return {
    type: 'view',
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
      { type: 'axisX', title: 'AxisX' },
      {
        type: 'axisY',
        title: 'AxisY',
        tickCount: 10,
        labelFontSize: 14,
        gridLineWidth: 10,
        gridStroke: 'red',
      },
    ],
  };
}
