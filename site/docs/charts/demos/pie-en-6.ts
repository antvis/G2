import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
  },
  encode: { x: 'clarity', color: 'clarity' },
  transform: [{ type: 'jitter' }],
  coordinate: { type: 'polar' },
  legend: false,
});

chart.render();
