import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .coordinate({ type: 'polar' })
  .scale('x', {
    type: 'linear',
    domain: [5, 10],
    range: [0, 1],
  })
  .scale('y', {
    type: 'linear',
    domain: [5, 10],
    range: [1, 0],
  });

chart
  .axisX()
  .attr('title', 'AxisX')
  .attr('tickFilter', (_, i, ticks) => i && i !== ticks.length - 1);

chart
  .axisY()
  .attr('title', 'AxisY')
  .style('labelFontSize', 14)
  .style('gridLineWidth', 10)
  .style('gridStroke', 'red');

chart.render();
