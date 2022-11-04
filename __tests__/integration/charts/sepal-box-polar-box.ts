import { sepalByRegion } from '../data/sepal';
import type { G2Spec } from '@/spec';

export function sepalBoxPolarBox(): G2Spec {
  return {
    type: 'box',
    data: sepalByRegion,
    coordinate: [{ type: 'polar', innerRadius: 0.2 }],
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
