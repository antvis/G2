import { Chart } from '../../../src';

export function issue7224(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    autoFit: true,
    canvas,
  });

  chart.options({
    type: 'interval',
    animate: false,
    height: 300,
    data: [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
    ],
    encode: { x: 'genre', y: 'sold', color: 'genre' },
    legend: {
      color: {
        title: '类型',
      },
    },
  });

  chart.render();

  return {
    chart,
    finished: Promise.resolve(),
  };
}
