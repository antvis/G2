import { G2Spec } from '../../../src';

export function liquidDiamond(): G2Spec {
  return {
    type: 'liquid',
    data: {
      value: {
        percent: 0.3,
      },
    },
    style: {
      shape: 'diamond',
    },
  };
}
