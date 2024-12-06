import { Chart } from '../../../src';

export function issue5474(context) {
  const { container, canvas, callback } = context;

  const chart = new Chart({
    container: container,
    autoFit: true,
    insetRight: 10,
    canvas,
  });

  if (callback) {
    callback(chart);
  } else {
    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 0 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold')
      .encode('color', 'genre')
      .label({
        text: 'genre',
        fill: (_, i, array, d) => d.element.attributes.fill,
      });
  }

  chart.render();

  return { chart };
}
