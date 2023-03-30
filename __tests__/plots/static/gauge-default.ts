import { G2Spec } from '../../../src';

export function gaugeDefault(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        current: 120,
        target: 400,
        name: 'score',
      },
    },
  };
}
