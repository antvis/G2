import { G2Spec } from '../../../src';

export function bulletCustomColor(): G2Spec {
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
    scale: {
      rangesColor: {
        ranges: ['#ccc', '#aaa', '#555', '#000'],
      },
    },
  };
}
