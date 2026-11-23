import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'point',
  data: {
    type: 'fetch',
    value:
      'https://assets.antv.antgroup.com/g2/top-30-countries-by-quality-of-life.json',
  },
  encode: { x: 'x', y: 'y' },
  scale: { x: { domain: [137.5, 212] }, y: { domain: [0, 80] } },
  labels: [{ text: 'name', fontSize: 10, dy: 6 }],
  style: { mainStroke: '#5B8FF9', mainLineWidth: 2 },
});

chart.render();
