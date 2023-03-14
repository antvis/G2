import { G2Spec } from '../../../src';

export function bulletGroup(): G2Spec {
  return {
    type: 'bullet',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: [
      {
        title: '重庆',
        ranges: [30, 90, 120],
        measures: [65],
        target: [80],
      },
      {
        title: '杭州',
        ranges: [30, 90, 150],
        measures: [50],
        target: [100],
      },
      {
        title: '广州',
        ranges: [30, 90, 120],
        measures: [40],
        target: [85],
      },
      {
        title: '深圳',
        ranges: [30, 90, 120],
        measures: [50],
        target: [100],
      },
    ],
  };
}
