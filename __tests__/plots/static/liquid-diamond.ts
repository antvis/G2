import { G2Spec } from '../../../src';

export function liquidDiamond(): G2Spec {
  return {
    type: 'liquid',
    data: 0.3,
    style: {
      shape: 'diamond',
    },
  };
}
liquidDiamond.skip = true;
