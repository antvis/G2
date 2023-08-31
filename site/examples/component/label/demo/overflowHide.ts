import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  autoFit: false,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .encode('color', 'steelblue')
  .axis('y', { labelFormatter: '.0%' })
  .label({
    text: 'frequency',
    position: 'inside',
    formatter: '.0%',
    transform: [{ type: 'overflowHide' }],
  });

chart.render();
