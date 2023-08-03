import { G2Spec } from '../../../src';

export function mockLegendColorSize(): G2Spec {
  return {
    type: 'legends',
    height: 80,
    scale: {
      color: {
        type: 'ordinal',
        domain: ['a', 'b'],
        range: ['steelblue', 'orange'],
      },
      size: {
        type: 'linear',
        domain: [0, 10],
        range: [0, 100],
      },
    },
  };
}
