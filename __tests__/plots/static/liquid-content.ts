import { G2Spec } from '../../../src';

export function liquidContent(): G2Spec {
  return {
    type: 'liquid',
    data: 0.581,
    style: {
      contentFill: '#000',
      contentText: 'center text',
      contentStroke: '#fff',
      contentLineWidth: 2,
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
}
liquidContent.skip = true;
