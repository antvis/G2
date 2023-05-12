import { G2Spec } from '../../../src';

export async function basicIntervalZeroDomainMin(): Promise<G2Spec> {
  return {
    type: 'interval',
    data: [
      { name: 'MODIFY', value: 138, washaway: 0.21014492753623193 },
      { name: 'PRERELEASE', value: 109, washaway: 0.5596330275229358 },
      { name: 'RELEASING', value: 48, washaway: 0 },
      { name: 'XXX', value: -48, washaway: 0 },
    ],
    encode: {
      x: 'name',
      y: 'value',
      color: 'name',
    },
    scale: {
      y: { domainMin: 0 },
    },
  };
}
