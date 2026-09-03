import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: [
        { genre: 'Sports', sold: 0 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ],
      encode: {
        x: 'genre',
        y: 'sold',
        color: 'genre',
      },
      style: {
        minHeight: 50,
      },
    },
  ],
});

chart.render();
