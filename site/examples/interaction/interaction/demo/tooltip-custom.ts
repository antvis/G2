import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  inset: 6,
});

chart
  .boxplot()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  })
  .encode('x', 'Expt')
  .encode('y', 'Speed')
  .tooltip({ name: 'min', channel: 'y' })
  .tooltip({ name: 'q1', channel: 'y1' })
  .tooltip({ name: 'q2', channel: 'y2' })
  .tooltip({ name: 'q3', channel: 'y3' })
  .tooltip({ name: 'max', color: 'red', channel: 'y4' });

chart.render();
