import { sepalByRegion } from '../data/sepal';
import type { G2Spec } from '@/spec';

export function sepalBoxSimpleBox(): G2Spec {
  return {
    type: 'box',
    data: sepalByRegion,
    encode: {
      x: 'x',
      y: 'y',
      color: 'x',
    },
    legend: false,
    scale: {
      x: { paddingInner: 0.6, paddingOuter: 0.3 },
      y: { zero: true },
    },
    style: {
      stroke: 'black',
    },
  };
}
