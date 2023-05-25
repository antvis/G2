import { Chart } from '../../esm';

const $container = document.getElementById('app')!;
const chart = new Chart({ theme: 'classic', container: $container });

chart.data([
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre');

chart.render();
