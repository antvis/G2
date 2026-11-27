import { Chart } from '../../../src';

export async function issue6751(context) {
  const { container, canvas } = context;
  const chart = new Chart({
    container,
    canvas,
  });
  const data = [
    {
      x: 0.8,
      y: 'A',
    },
    {
      x: 1,
      y: 'A',
    },
    {
      x: 2,
      y: 'B',
    },
    {
      x: 3,
      y: 'C',
    },
  ];
  chart
    .point()
    .data(data)
    .encode('x', 'x')
    .encode('y', 'y')
    .interaction('brushHighlight', {})
    .scale({
      x: {
        domain: [0.5, 5],
      },
      y: {
        range: [1, 0],
      },
    });

  chart.on('brush:end', (e) => {
    console.log(e.data.selection);
  });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
