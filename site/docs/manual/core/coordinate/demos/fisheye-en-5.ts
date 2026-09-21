import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  coordinate: {
    transform: [
      { type: 'transpose' },
      {
        type: 'fisheye',
        focusX: 0.5,
        focusY: 0.5,
        distortionX: 2,
        distortionY: 2,
      },
    ],
  },
  type: 'interval',
  data: [
    { genre: 'Sports', sold: 275 },
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
});

chart.render();
