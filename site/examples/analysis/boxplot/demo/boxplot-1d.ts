import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 120,
});

chart.coordinate({ type: 'transpose' });

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  })
  .encode('y', 'Speed')
  .style('boxFill', '#aaa')
  .style('pointStroke', '#000')
  .inset(6);

chart.render();
