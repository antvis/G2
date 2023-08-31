import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .line()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  })
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'close')
  .label({
    text: 'close',
    transform: [
      {
        type: 'overlapHide',
      },
    ],
  });

chart.render();
