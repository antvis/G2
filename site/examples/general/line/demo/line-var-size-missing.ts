import { Chart } from '@antv/g2';

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
    transform: [
      { type: 'slice', end: 100 },
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          close1: d.date.getDate() <= 5 ? NaN : d.close,
        }),
      },
    ],
  })
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'close1')
  .encode('size', 'close')
  .style('shape', 'trail');

chart.render();
