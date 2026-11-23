import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
  },
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: ({ u, v }) => Math.hypot(v, u),
    color: ({ u, v }) => Math.hypot(v, u),
  },
  scales: {
    size: { range: [6, 20] },
    color: { type: 'sequential', palette: 'viridis' },
  },
  axis: {
    x: { grid: false },
    y: { grid: false },
  },
  style: {
    arrowSize: 4,
    // arrowSize: '30%',
  },
  legend: false,
});

chart.render();
