import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});
chart.options({
  type: 'vector',
  data: [
    { longitude: 3.375, latitude: 45.625, u: -1.3287959, v: -2.6778967 },
    { longitude: 3.625, latitude: 45.625, u: -1.012322, v: -2.8640392 },
    { longitude: 3.875, latitude: 45.625, u: -0.7947747, v: -3.0722558 },
    { longitude: 4.125, latitude: 45.625, u: -0.70024896, v: -3.311115 },
    { longitude: 4.375, latitude: 45.625, u: -0.62092346, v: -3.5720115 },
    { longitude: 4.625, latitude: 45.625, u: -0.54210645, v: -3.798527 },
    { longitude: 4.875, latitude: 45.625, u: -0.531152, v: -3.6907976 },
    { longitude: 5.125, latitude: 45.625, u: -0.58284736, v: -3.2739944 },
    { longitude: 5.375, latitude: 45.625, u: -0.6388908, v: -2.8400586 },
    { longitude: 5.625, latitude: 45.625, u: -0.68683237, v: -2.4499083 },
    { longitude: 5.875, latitude: 45.625, u: -0.6949226, v: -2.2482452 },
    { longitude: 6.125, latitude: 45.625, u: -0.67617714, v: -2.189318 },
    { longitude: 6.375, latitude: 45.625, u: -0.6690367, v: -2.1100578 },
    { longitude: 6.625, latitude: 45.625, u: -0.6749189, v: -2.0985062 },
    { longitude: 6.875, latitude: 45.625, u: -0.61023676, v: -2.067676 },
    { longitude: 7.125, latitude: 45.625, u: -0.46769565, v: -1.9350243 },
    { longitude: 7.375, latitude: 45.625, u: -0.31841764, v: -1.7978805 },
    { longitude: 7.625, latitude: 45.625, u: -0.296789, v: -1.6545589 },
    { longitude: 7.875, latitude: 45.625, u: -0.49164182, v: -1.6660733 },
    { longitude: 8.125, latitude: 45.625, u: -0.7730643, v: -1.8458021 },
    { longitude: 8.375, latitude: 45.625, u: -1.0214152, v: -2.0177982 },
    { longitude: 8.625, latitude: 45.625, u: -1.131555, v: -2.0604942 },
    { longitude: 8.875, latitude: 45.625, u: -1.143751, v: -1.9134171 },
    { longitude: 9.125, latitude: 45.625, u: -1.1628431, v: -1.6859006 },
    { longitude: 9.375, latitude: 45.625, u: -1.1996219, v: -1.4945693 },
    { longitude: 9.625, latitude: 45.625, u: -1.2651129, v: -1.385864 },
    { longitude: 9.875, latitude: 45.625, u: -1.340052, v: -1.3189282 },
  ],
  encode: {
    x: 'longitude',
    y: 'latitude',
    rotate: ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI,
    size: 30,
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
    arrowSize: 10,
  },
  legend: false,
});

chart.render();
