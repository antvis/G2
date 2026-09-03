import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  coordinate: { type: 'theta' },
  children: [
    {
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      transform: [{ type: 'stackY' }],
      encode: {
        color: 'genre',
        y: 'sold',
      },
      animate: {
        enter: { type: 'waveIn', duration: 1000 },
      },
    },
  ],
});

chart.render();
