import { G2Spec } from '../../../src';

export function liquidPin(): G2Spec {
  return {
    type: 'liquid',
    data: 0.7,
    style: {
      shape: 'pin',
      contentFill: '#fff',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
}
liquidPin.skip = true;
