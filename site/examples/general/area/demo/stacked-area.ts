import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
});

chart
  .area()
  .transform([
    { type: 'stackY' }, // Try to remove this line.
  ])
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'unemployed')
  .encode('color', 'industry')
  .encode('shape', 'smooth');

chart.render();
