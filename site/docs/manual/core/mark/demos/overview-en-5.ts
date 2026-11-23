import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'view',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/range-spline-area.json',
    transform: [
      {
        type: 'map',
        callback: ([x, low, high, v2, v3]) => ({
          x,
          low,
          high,
          v2,
          v3,
        }),
      },
    ],
  },
  scale: { x: { type: 'linear', tickCount: 10 } },
  axis: { y: { title: false } },
  children: [
    {
      type: 'area',
      encode: { x: 'x', y: ['low', 'high'], shape: 'smooth' },
      style: { fillOpacity: 0.65, fill: '#64b5f6', lineWidth: 1 },
    },
    {
      type: 'point',
      encode: { x: 'x', y: 'v2', size: 2, shape: 'point' },
      tooltip: { items: ['v2'] },
    },
    {
      type: 'line',
      encode: { x: 'x', y: 'v3', color: '#FF6B3B', shape: 'smooth' },
    },
  ],
});
chart.render();
