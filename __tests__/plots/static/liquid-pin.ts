import { G2Spec } from '../../../src';

export function liquidPin(): G2Spec {
  return {
    type: 'liquid',
    data: {
      value: {
        percent: 0.7,
      },
    },
    style: {
      shape: 'pin',
      textFill: '#fff',
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
}