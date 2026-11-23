import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'interval',
  autoFit: true,
  data: [
    { genre: 'Sports', sold: 15000 },
    { genre: 'Strategy', sold: 14900 },
    { genre: 'Action', sold: 15050 },
    { genre: 'Shooter', sold: 13000 },
    { genre: 'Other', sold: 13900 },
  ],
  encode: {
    y: 'sold',
    color: 'genre',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  legend: {
    color: {
      position: 'bottom',
      layout: { justifyContent: 'center' },
    },
  },
  labels: [
    {
      text: (d, i, data) => {
        const total = data.reduce((acc, curr) => acc + curr.sold, 0);
        const percent = ((d.sold / total) * 100).toFixed(2);
        return `${percent}%`;
      },
      style: {
        fontSize: 10,
      },
    },
  ],
});

chart.render();
