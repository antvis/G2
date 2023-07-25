import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .gauge()
  .data({
    value: {
      target: 120,
      total: 400,
      name: 'score',
    },
  })
  .legend(false);

chart.render();
