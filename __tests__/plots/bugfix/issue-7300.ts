import { Chart } from '../../../src';

export function issue7300(context) {
  const { container, canvas, callback } = context;

  const chart = new Chart({
    container: container,
    autoFit: true,
    canvas,
    width: 400,
    height: 500,
  });

  if (callback) {
    callback(chart);
  } else {
    chart
      .gauge()
      .data({
        value: {
          target: 120,
          total: 400,
          name: 'score',
        },
      })
      .axis('y', {
        position: 'inner',
      })
      .legend(false);
  }

  chart.render();

  return { chart };
}
