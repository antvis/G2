import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  insetLeft: 40,
  insetRight: 40,
  data: {
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
  },
  encode: {
    x: (d) => new Date(d.date).getFullYear(),
    y: 'price',
    color: 'symbol',
  },
  transform: [{ type: 'groupX', y: 'mean' }],
  labels: [{ text: 'price', transform: [{ type: 'overlapDodgeY' }] }],
});

chart.render();
