import { Chart } from '../../../src';

function HOMMark(options) {
  const { encode, ...res } = options;
  return [
    {
      type: 'interval',
      ...res,
      encode: {
        ...encode,
        color: 'genre',
      },
    },
    {
      type: 'line',
      ...options,
    },
    {
      type: 'point',
      ...options,
    },
  ];
}

export function chartHOMMark(context) {
  const { container, canvas } = context;

  const chart = new Chart({ container, canvas });

  chart.data([
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]);

  chart.mark(HOMMark).encode('x', 'genre').encode('y', 'sold');

  chart
    .text()
    .style('text', 'TEST')
    .style('x', '50%')
    .style('y', '50%')
    .style('fontSize', 40);

  const finished = chart.render();

  return { finished };
}
