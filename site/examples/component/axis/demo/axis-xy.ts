import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .scale('x', {
    type: 'linear',
    domain: [5, 10],
    range: [0, 1],
  })
  .scale('y', {
    type: 'linear',
    domain: [5, 10],
    range: [0, 1],
  });

chart.axisX().attr('title', 'AxisX');

chart
  .axisY()
  .attr('title', 'AxisY')
  .attr('tickCount', 10)
  .style('labelFontSize', 14)
  .style('gridLineWidth', 10)
  .style('gridStroke', 'red');

chart.render();
