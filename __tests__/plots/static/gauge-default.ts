import { G2Spec } from '../../../src';

export function gaugeDefault(): G2Spec {
  return {
    type: 'view',
    legend: false,
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    },
    children: [{ type: 'gauge' }],
  };
}
