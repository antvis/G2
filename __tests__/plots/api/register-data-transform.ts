import { register, Chart } from '../../../src';

export function registerDataTransform(context) {
  const { container, canvas } = context;

  register('data.double', (options) => {
    const { field } = options;
    return (data) =>
      data.map((d) => ({
        ...d,
        [field]: d[field] * 2,
      }));
  });

  const chart = new Chart({ container, canvas });

  chart.data({
    value: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    transform: [{ type: 'double', field: 'sold' }],
  });

  chart
    .interval()
    .encode('x', 'genre')
    .encode('y', 'sold')
    .encode('color', 'genre');

  const finished = chart.render();

  return { finished };
}
