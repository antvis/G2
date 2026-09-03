import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  title: {
    align: 'right',
    title: 'Sold by genre, sorted by sold',
    titleFontSize: 15,
    subtitle: 'It shows the sales volume of genre, sored by sold.',
    subtitleFill: 'red',
    subtitleFontSize: 12,
    subtitleShadowColor: 'yellow',
    subtitleShadowBlur: 5,
    subtitleFontStyle: 'italic',
  },
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
