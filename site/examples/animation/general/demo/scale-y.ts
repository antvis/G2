import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .animate('enterType', 'scaleInY')
  .animate('enterDuration', 1000)
  .animate('exitType', 'scaleOutY')
  .animate('exitDuration', 2000);

chart.render();
