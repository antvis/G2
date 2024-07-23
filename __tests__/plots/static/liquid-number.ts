import { G2Spec } from '../../../src';

export function liquidNumber(): G2Spec {
  return {
    type: 'view',
    data: 0.3,
    children: [{ type: 'liquid' }],
  };
}

liquidNumber.skip = true;
