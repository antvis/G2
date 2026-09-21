import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  children: [
    {
      type: 'point',
      data: {
        type: 'fetch',
        value:
          'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
      },
      encode: { x: 'date', y: 'value', color: 'value', shape: 'point' },
      scale: {
        color: { type: 'sqrt', domain: [0, 1], range: ['#1689F1', '#1AC07D'] },
      },
      style: { stroke: '#000', strokeOpacity: 0.2 },
      tooltip: {
        items: [
          {
            channel: 'x',
            name: 'year',
            valueFormatter: (d) => d.getFullYear(),
          },
          { channel: 'y' },
        ],
      },
    },
    { type: 'lineY', data: [0], style: { stroke: '#000', strokeOpacity: 0.2 } },
  ],
});
chart.render();
