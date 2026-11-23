import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'gauge',
  data: {
    value: {
      target: 120,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  },
  scale: {
    color: { range: ['#F4664A', '#FAAD14', 'green'] },
  },
});

chart.render();
