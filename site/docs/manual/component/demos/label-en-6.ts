import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'interval',
  height: 300,
  data: [
    { genre: 'Sports', sold: 40 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: { x: 'genre', y: 'sold', color: 'genre' },
  scale: {
    color: { range: ['#ff0000', '#f0d2fc', '#2b00ff', '#ff8000', '#064501'] },
  },
  labels: [{ text: 'genre' }],
});

chart.render();
