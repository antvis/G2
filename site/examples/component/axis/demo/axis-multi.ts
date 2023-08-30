import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' });

chart
  .axisY()
  .attr('position', 'right')
  .scale('y', {
    type: 'linear',
    independent: true,
    domain: [0, 10],
    range: [1, 0],
  })
  .style('grid', false);

chart.render();
