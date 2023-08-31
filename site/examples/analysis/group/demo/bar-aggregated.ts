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
  .encode('color', 'clarity')
  .axis('y', { labelFormatter: '~s' })
  .tooltip({ channel: 'y', valueFormatter: '~s' });

chart.render();
