import { G2Spec } from '../../../src';

export function gaugeRoundShape(): G2Spec {
  return {
    type: 'gauge',
    data: {
      value: {
        target: 159,
        total: 400,
        name: 'score',
        thresholds: [100, 200, 400],
      },
    },
    scale: {
      color: {
        range: ['#F4664A', '#FAAD14', 'green'],
      },
    },
    legend: false,
    style: {
      arcShape: 'round',
      arcLineWidth: 2,
      arcStroke: '#fff',
      textContent: (target, total) => {
        return `得分：${target}\n占比：${(target / total) * 100}%`;
      },
    },
  };
}
