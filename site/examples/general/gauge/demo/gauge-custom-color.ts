import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .gauge()
  .data({
    value: {
      target: 159,
      total: 400,
      name: 'score',
      thresholds: [100, 200, 400],
    },
  })
  .scale('color', {
    range: ['#F4664A', '#FAAD14', 'green'],
  })
  .style(
    'textContent',
    (target, total) => `得分：${target}\n占比：${(target / total) * 100}%`,
  )
  .legend(false);

chart.render();
