import { G2Spec } from '../../../src';

export function mockAxisY(): G2Spec {
  return {
    type: 'axisY',
    padding: 10,
    paddingLeft: 'auto',
    width: 100,
    scale: {
      y: {
        type: 'linear',
        domain: [5, 10],
        range: [0, 1],
      },
    },
    tickCount: 10,
    title: 'axisX',
    labelFontSize: 14,
    gridLineWidth: 10,
    gridStroke: 'red',
  };
}
