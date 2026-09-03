import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-03.json',
  },
  encode: {
    x: 'date',
  },
  scale: {
    color: {
      domain: ['down', 'up'],
      range: ['#4daf4a', '#e41a1c'],
    },
    x: {
      compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    },
    y: {
      domain: [20, 35],
    },
  },
  axis: {
    x: {
      labelFormatter: (d) => new Date(d).toLocaleDateString(),
    },
  },
  interaction: {
    tooltip: {
      shared: true,
    },
  },
  children: [
    {
      type: 'area',
      encode: {
        y: 'range',
      },
      style: {
        fillOpacity: 0.3,
        fill: '#64b5f6',
      },
      animate: false,
    },
    {
      type: 'link',
      encode: {
        y: ['lowest', 'highest'],
        color: 'trend',
      },
      animate: {
        enter: {
          type: 'waveIn',
        },
      },
    },
    {
      type: 'interval',
      encode: {
        y: ['start', 'end'],
        color: 'trend',
      },
      style: {
        fillOpacity: 1,
      },
      axis: {
        y: {
          title: false,
        },
      },
      tooltip: {
        title: 'date',
        items: [
          { field: 'start' },
          { field: 'end' },
          { field: 'lowest' },
          { field: 'highest' },
        ],
      },
      animate: {
        enter: {
          type: 'waveIn',
        },
      },
    },
    {
      type: 'line',
      encode: {
        x: 'date',
        y: 'mean',
      },
      style: {
        stroke: '#FACC14',
      },
    },
  ],
});

chart.render();
