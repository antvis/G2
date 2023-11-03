import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });
chart.data([
  { genre: 'Sports', sold: 0 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]);

chart
  .interval()
  .encode('x', 'genre')
  .encode('y', 'sold')
  .encode('color', 'genre')
  .axis({ x: { animate: false }, y: { animate: false } })
  .style('draggable', true)
  .style('droppable', true)
  .style('minHeight', 50);
