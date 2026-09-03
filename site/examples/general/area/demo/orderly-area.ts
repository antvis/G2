import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'area',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/e58c9758-0a09-4527-aa90-fbf175b45925.json',
      },
      transform: [{ type: 'stackY', orderBy: 'value' }],
      encode: {
        x: (d) => new Date(d.date),
        y: 'unemployed',
        color: 'industry',
        shape: 'smooth',
      },
      scale: {
        x: { utc: true },
      },
      axis: {
        x: { title: 'Date' },
        y: { labelFormatter: '~s' },
      },
      legend: {
        color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
      },
    },
  ],
});

chart.render();
