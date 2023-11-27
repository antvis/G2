import { Chart } from '../../../src';

export function chartOnScrollbarFilter(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

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
    .scrollbar('x', true)
    .interaction('elementSelect');

  chart.on('element:select', (event) => {
    const { data, nativeEvent } = event;
    if (nativeEvent) console.log(data);
  });

  chart.on('element:click', (e) => console.log(e.data.data));

  const finished = chart.render();

  return { chart, finished };
}
