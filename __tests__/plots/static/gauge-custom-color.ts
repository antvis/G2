import { G2Spec } from '../../../src';

export function gaugeCustomColor(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    },
    scale: {
      color: {
        domain: [100, 200, 400],
        range: ['#F4664A', '#FAAD14', 'green'],
      },
    },
  };
}
