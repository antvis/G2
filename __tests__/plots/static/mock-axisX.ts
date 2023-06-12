import { G2Spec } from '../../../src';

export function mockAxisX(): G2Spec {
  return {
    type: 'axisX',
    padding: 'auto',
    height: 80,
    scale: {
      x: {
        type: 'linear',
        domain: [5, 10],
        range: [0, 1],
      },
    },
    tickCount: 10,
  };
}
