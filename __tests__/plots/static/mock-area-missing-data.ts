import { G2Spec } from '../../../src';

export function mockAreaMissingData(): G2Spec {
  return {
    type: 'area',
    data: [
      { province: 'A', city: 'a', categories: 'Q1', gross: null },
      { province: 'B', city: 'b', categories: 'Q2', gross: 2610.5 },
      { province: 'B', city: 'c', categories: 'Q2', gross: 417.23 },
    ],
    encode: {
      x: 'city',
      y: 'gross',
      shape: 'smooth',
      color: (d) => `${d.province}+${d.categories}`,
    },
  };
}
