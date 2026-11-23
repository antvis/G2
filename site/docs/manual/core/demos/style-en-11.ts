import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'interval',
  height: 350,
  data: [
    { genre: 'Sports', sold: 30 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold' },
  style: {
    fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff',
  },
});

chart.render();
