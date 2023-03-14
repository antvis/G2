import { G2Spec } from '../../../src';

export function bulletDefault(): G2Spec {
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
    ],
  };
}
