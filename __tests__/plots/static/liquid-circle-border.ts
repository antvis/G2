import { G2Spec } from '../../../src';

export function liquidCircleBorder(): G2Spec {
  return {
    type: 'liquid',
    data: 0,
    style: {
      shape: 'circle',
      outlineBorder: 4,
    },
  };
}
liquidCircleBorder.skip = true;
