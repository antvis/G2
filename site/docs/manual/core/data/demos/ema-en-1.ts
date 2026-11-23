import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
        transform: [
          {
            type: 'ema',
            field: 'close',
            alpha: 0.8,
            as: 'emaClose',
          },
        ],
      },
      encode: {
        x: 'date',
        y: 'emaClose',
      },
    },
    {
      type: 'line',
      style: {
        opacity: 0.3,
      },
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      },
      encode: {
        x: 'date',
        y: 'close',
      },
    },
  ],
});

chart.render();
