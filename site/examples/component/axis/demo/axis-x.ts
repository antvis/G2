import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 80,
});

chart
  .axisX()
  .scale('x', {
    type: 'linear',
    domain: [5, 10],
    range: [0, 1],
  })
  .attr('tickCount', 10)
  .attr('title', 'AxisX');

chart.render();
