import { G2Spec } from '../../../src';

export async function basicLineNullLabel(): Promise<G2Spec> {
  return {
    type: 'line',
    data: [
      { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
      { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
      { name: 'RELEASING', value: 48, washaway: 0 },
      { name: 'XXX', value: null, washaway: 0 },
    ],
    encode: {
      x: 'name',
      y: 'value',
    },
    labels: [{ text: 'name' }],
  };
}
