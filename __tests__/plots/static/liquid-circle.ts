import { G2Spec } from '../../../src';

export function liquidCircle(): G2Spec {
  return {
    type: 'liquid',
    data: {
      value: {
        percent: 0.3,
      },
    },
    style: {
      shape: 'circle',
    },
  };
}
