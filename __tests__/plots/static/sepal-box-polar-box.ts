import { G2Spec } from '../../../src';
import { sepalByRegion } from '../../data/sepal';

export function sepalBoxPolarBox(): G2Spec {
  return {
    type: 'box',
    data: sepalByRegion,
    coordinate: { type: 'polar', innerRadius: 0.2 },
    encode: {
      x: 'x',
      y: 'y',
      color: 'x',
    },
    axis: { y: { direction: 'center' } },
    legend: false,
    scale: {
      x: { paddingInner: 0.6, paddingOuter: 0.3 },
      y: { zero: true },
    },
    style: {
      stroke: 'black',
      lineWidth: 2,
    },
  };
}
