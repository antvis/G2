import { G2Spec } from '../../../src';

export function alphabetIntervalFunnelRadius(): G2Spec {
  return {
    type: 'interval',
    coordinate: {
      transform: [{ type: 'transpose' }],
    },
    data: [
      { text: '页面1', value: 800 },
      { text: '页面2', value: 1000 },
      { text: '页面3', value: 800 },
      { text: '页面4', value: 1000 },
      { text: '页面5', value: 900 },
      { text: '页面6', value: 700 },
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
      innerRadiusTopLeft: 0,
      innerRadiusTopRight: 5,
      innerRadiusBottomRight: 10,
      innerRadiusBottomLeft: 15,
      radiusBottomRight: 0,
      radiusBottomLeft: 0,
    },
    encode: {
      x: 'text',
      y: 'value',
      color: 'text',
      shape: 'funnel',
    },
    scale: {
      x: { paddingOuter: 0, paddingInner: 0 },
      color: { type: 'ordinal', range: ['red', 'green', 'blue', '#e45ca2'] },
    },
  };
}
