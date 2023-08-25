import { Chart } from '../../../src';

export function chartRenderEvent(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

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

  chart.on('interval:click', () => {
    console.log('hello world');
  });

  const finished = chart.render().then((chart) => chart.render());

  return { chart, finished };
}
