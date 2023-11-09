import { G2Spec } from '../../../src';

export function liquidTriangle(): G2Spec {
  return {
    type: 'liquid',
    data: 0.3,
    style: {
      shape: 'triangle',
    },
  };
}
liquidTriangle.skip = true;
