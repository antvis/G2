import { G2Spec } from '../../../src';

export function progressRing(): G2Spec {
  return {
    type: 'progress',
    data: {
      value: {
        target: 400,
        current: 300,
      },
    },
    style: {
      textContent: (current, target) => {
        return `得分：${current}\n占比：${(current / target) * 100}%`;
      },
      textFontSize: 30,
      textFill: 'rgba(74, 74, 74, 1)',
    },
  };
}
