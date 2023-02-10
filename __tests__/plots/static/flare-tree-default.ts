import { G2Spec } from '../../../src';

export async function flareTreeDefault(): Promise<G2Spec> {
  return {
    width: 800,
    height: 800,
    type: 'tree',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/flare.json',
    },
  };
}
