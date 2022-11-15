import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.coordinate({ type: 'theta' });

chart
  .interval()
  .data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .transform({ type: 'stackY' })
  .encode('color', 'genre')
  .encode('y', 'sold')
  .animate('enterType', 'waveIn')
  .animate('enterDuration', 1000);

chart.render();
