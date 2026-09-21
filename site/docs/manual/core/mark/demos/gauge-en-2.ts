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
    },
  },
  scale: {
    color: { range: ['#FAAD14', 'green'] },
  },
});

chart.render();
