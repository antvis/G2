import { G2Spec } from '../../../src';

export function progressRingCustom(): G2Spec {
  return {
    type: 'progress',
    graphType: 'arc',
    data: {
      value: {
        percent: 0.7,
      },
    },
    style: {
      textContent: (current, target) => {
        return `得分：${current}\n占比：${(current / target) * 100}%`;
      },
      textFontSize: 26,

      foreRadius: 26,
      foreShadowColor: 'color',
      foreShadowBlur: 10,
      foreShadowOffsetX: -1,
      foreShadowOffsetY: -1,
    },

    scale: {
      color: {
        range: ['rgba(250, 57, 57, 1)'],
      },
    },
  };
}
