import { G2Spec } from '../../../src';
import { sepal } from '../../data/sepal';

export function sepalBoxGroupedBox(): G2Spec {
  return {
    type: 'box',
    data: sepal,
    encode: {
      x: 'type',
      y: 'bin',
      series: 'Species',
      color: 'Species',
    },
    legend: false,
    scale: {
      x: { paddingInner: 0.2, paddingOuter: 0.1 },
      y: { zero: true },
      series: { paddingInner: 0.3, paddingOuter: 0.1 },
    },
    style: {
      stroke: 'black',
      lineWidth: 2,
    },
  };
}
