import { Chart } from '../../../src';

export function chartOnItemElement(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
  });

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
    .encode('color', 'genre')
    .axis({ x: { animate: false }, y: { animate: false } });

  chart.on('interval:click', (e) => {
    console.log(e.data.data);
  });

  chart.on('element:click', (e) => {
    console.log(e.data.data);
  });

  const finished = chart.render();

  return { chart, finished };
}
