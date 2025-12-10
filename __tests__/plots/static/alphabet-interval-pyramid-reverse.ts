import { G2Spec } from '../../../src';

export function alphabetIntervalPyramidReverse(): G2Spec {
  return {
    type: 'interval',
    coordinate: {
      transform: [{ type: 'transpose' }],
    },
    data: [
      { text: '页面', value: 200 },
      { text: '页面1', value: 400 },
      { text: '页面2', value: 600 },
      { text: '页面3', value: 800 },
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
      reverse: true,
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
