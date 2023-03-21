import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  paddingLeft: 60,
  autoFit: true,
});

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  })
  .encode('x', 'Expt')
  .encode('y', 'Speed')
  .style('point', false);

chart.render();
