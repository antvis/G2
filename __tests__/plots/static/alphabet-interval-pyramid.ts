import { G2Spec } from '../../../src';

export function alphabetIntervalPyramid(): G2Spec {
  return {
    type: 'interval',
    coordinate: {
      transform: [{ type: 'transpose' }],
    },
    data: [
      { text: '页面', value: 1000 },
      { text: '页面1', value: 900 },
      { text: '页面2', value: 800 },
      { text: '页面3', value: 700 },
    ],
    transform: [
      {
        type: 'symmetryY',
      },
    ],
    axis: {
      x: false,
      y: false,
    },
    style: {
      stroke: '#ff0000',
    },
    encode: {
      x: 'text',
      y: 'value',
      color: 'text',
      shape: 'pyramid',
    },
    scale: {
      x: { paddingOuter: 0, paddingInner: 0 },
      color: { type: 'ordinal', range: ['red', 'green', 'blue', '#e45ca2'] },
    },
  };
}
