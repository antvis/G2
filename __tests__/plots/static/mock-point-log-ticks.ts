import { G2Spec } from '../../../src';

export function mockPointLogTicks(): G2Spec {
  return {
    type: 'point',
    data: [
      [5, 0.09459459],
      [10, 0.22972973],
      [15, 0.36486486],
      [20, 0.5],
      [25, 0.63513514],
      [30, 0.77027027],
      [35, 0.90540541],
    ],
    encode: {
      x: (d) => d[0],
      y: (d) => d[1],
    },
    scale: {
      x: { type: 'log', nice: true },
      y: { type: 'log', domain: [0.001, 1] },
    },
    axis: {
      x: { tickCount: -1 },
      y: { tickCount: -1 },
    },
  };
}
