import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/aapl.json',
});

chart
  .area()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'close');

chart.render();
