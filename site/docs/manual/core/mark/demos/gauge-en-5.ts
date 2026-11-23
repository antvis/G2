import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'gauge',
  data: {
    value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
  },
  scale: {
    color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
  },
  style: {
    textContent: (target, total) => `得分：${target}
占比：${(target / total) * 100}%`,
  },
  legend: false,
});

chart.render();
