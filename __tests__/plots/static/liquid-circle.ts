import { G2Spec } from '../../../src';

export function liquidCircle(): G2Spec {
  return {
    type: 'liquid',
    data: 0.3,
    style: {
      shape: 'circle',
    },
  };
}
liquidCircle.skip = true;
