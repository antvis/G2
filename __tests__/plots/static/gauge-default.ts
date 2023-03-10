import { G2Spec } from '../../../src';

export function gaugeDefault(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        target: 120,
        total: 400,
        name: 'score',
      },
    },
  };
}
