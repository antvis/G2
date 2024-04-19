import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingTop: 40,
});

chart
  .wordCloud()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/philosophy-word.json',
  })
  .layout({
    spiral: 'rectangular',
    fontSize: [20, 100],
  })
  .encode('color', 'text');

chart.render();
