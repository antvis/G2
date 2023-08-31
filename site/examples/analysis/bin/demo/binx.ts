import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment2.json',
  })
  .encode('x', 'rate')
  .transform({ type: 'binX', y: 'count' })
  .style('inset', 0.5);

chart.render();
