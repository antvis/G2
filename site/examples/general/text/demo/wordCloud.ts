import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart
  .wordCloud()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  })
  .layout({
    spiral: 'rectangular',
  })
  .encode('color', 'text');

chart.render();
