import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
      },
      transform: [
        {
          type: 'groupX',
          y: 'max',
        },
      ],
      encode: {
        x: 'clarity',
        y: 'price',
        color: 'clarity',
      },
      axis: {
        y: { labelFormatter: '~s' },
      },
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '~s' }],
      },
    },
  ],
});

chart.render();
