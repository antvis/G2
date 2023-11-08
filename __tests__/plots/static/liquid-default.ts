import { G2Spec } from '../../../src';

export function liquidDefault(): G2Spec {
  return {
    type: 'liquid',
    autoFit: true,
    data: 0.3,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
}

liquidDefault.skip = true;
