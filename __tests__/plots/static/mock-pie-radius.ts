import { G2Spec } from '../../../src';

export function mockPieRadius(): G2Spec {
  return {
    type: 'interval',
    data: [
      { type: '微博', value: 20 },
      { type: '其他', value: 20 },
    ],
    encode: {
      y: 'value',
      color: 'type',
    },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    style: {
      radius: 10,
      inset: 2,
    },
  };
}
