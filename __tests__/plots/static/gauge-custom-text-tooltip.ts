import { G2Spec } from '../../../src';
export function gaugeCustomTextTooltip(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        target: 159,
        total: 424,
        name: 'score',
      },
    },
    style: {
      pinShape: false,
      textContent: (target, total) => {
        return `得分：${target}\n占比：${(target / total) * 100}%`;
      },
      textTooltip: {
        items: [
          (d, index, data, column) => {
            return {
              name: 'y',
              value: column.y.value[index], // 使用 y 通道的值
            };
          },
        ],
      },
    },
  };
}
