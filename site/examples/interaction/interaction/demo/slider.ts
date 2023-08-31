import { Chart } from '@antv/g2';
import { format } from 'fecha';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
  })
  .encode('x', 'date')
  .encode('y', 'close')
  .axis({ x: { title: false, size: 40 }, y: { title: false, size: 36 } })
  .slider({
    x: { labelFormatter: (d) => format(d, 'YYYY/M/D') },
    y: { labelFormatter: '~s' },
  });

chart.render();
