import { G2Spec } from '../../../src';

export function mockLegendCategoryTitle(): G2Spec {
  return {
    type: 'legends',
    height: 60,
    title: '分类图例',
    scale: {
      color: {
        type: 'ordinal',
        domain: ['a', 'b'],
        range: ['steelblue', 'orange'],
      },
    },
  };
}
