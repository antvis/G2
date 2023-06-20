import { G2Spec } from '../../../src';

export function mockLegendColor(): G2Spec {
  return {
    type: 'legends',
    padding: 'auto',
    height: 100,
    scale: {
      color: {
        type: 'ordinal',
        domain: ['a', 'b'],
        range: ['steelblue', 'orange'],
      },
    },
  };
}
