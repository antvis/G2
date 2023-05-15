import { G2Spec } from '../../../src';

export function gaugeCustomColor(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
        thresholds: [100, 200, 400],
      },
    },
    scale: {
      color: {
        range: ['#F4664A', '#FAAD14', 'green'],
      },
    },
  };
}
