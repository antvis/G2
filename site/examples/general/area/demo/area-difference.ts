import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// .scale('color', { range: ['#67a9cf', '#ef8a62'] });

// Diff the 2 area shape.
chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
  },
  children: [
    {
      type: 'area',
      data: {
        transform: [
          {
            type: 'fold',
            fields: ['New York', 'San Francisco'],
            key: 'city',
            value: 'temperature',
          },
        ],
      },
      transform: [{ type: 'diffY' }],
      encode: {
        x: (d) => new Date(d.date),
        y: 'temperature',
        color: 'city',
        shape: 'hvh',
      },
    },
    {
      type: 'line',
      encode: {
        x: (d) => new Date(d.date),
        y: 'San Francisco',
        shape: 'hvh',
      },
      style: {
        stroke: '#000',
      },
      tooltip: false,
    },
  ],
});

chart.render();
