import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetRight: 10,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'line',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/indices.json',
      },
      transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
      encode: {
        x: (d) => new Date(d.Date),
        y: 'Close',
        color: 'Symbol',
      },
      scale: {
        y: { type: 'log' },
      },
      axis: {
        y: { title: '↑ Change in price (%)' },
      },
      labels: [
        {
          text: 'Symbol',
          selector: 'last',
          fontSize: 10,
        },
      ],
      tooltip: {
        items: [{ channel: 'y', valueFormatter: '.1f' }],
      },
    },
  ],
});

chart.render();
