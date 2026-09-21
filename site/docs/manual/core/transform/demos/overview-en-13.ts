import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  children: [
    {
      type: 'interval',
      encode: {
        x: (d) => new Date(d.date).getUTCMonth(),
        y: 'precipitation',
      },
      transform: [{ type: 'groupX', y: 'mean' }],
      scale: { y: { tickCount: 5, domainMax: 6 } },
      tooltip: { items: [{ channel: 'y', valueFormatter: '.2f' }] },
    },
    {
      type: 'lineY',
      encode: { y: 'precipitation' },
      transform: [{ type: 'groupX', y: 'mean' }],
      style: {
        stroke: '#F4664A',
        strokeOpacity: 1,
        lineWidth: 2,
        lineDash: [3, 3],
      },
    },
  ],
});

chart.render();
