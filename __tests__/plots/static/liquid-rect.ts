import { G2Spec } from '../../../src';

export function liquidRect(): G2Spec {
  return {
    type: 'liquid',
    data: 0.3,
    style: {
      shape: 'rect',
    },
  };
}
liquidRect.skip = true;
