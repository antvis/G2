import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  })
  .transform({
    type: 'groupX',
    y: 'max',
  })
  .encode('x', 'clarity')
  .encode('y', 'price')
  .axis('y', { labelFormatter: '~s' })
  .label({ text: (d, i, data, { channel }) => channel.y[i] })
  .style('fill', (d, i, data, { channel }) =>
    channel.y[i] < 11700 ? '#E49361' : '#4787F7',
  )
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart.render();
