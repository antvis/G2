import { Chart } from '../../../src';

export function issue6396(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container: container,
    canvas,
  });

  let i = 1;

  chart.data([
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ]);
  chart.animate(false);

  chart
    .interval()
    .encode('x', (_, idx) => idx)
    .encode('y', (d) => d)
    .axis(false);

  const lineY = chart
    .lineY()
    .style('stroke', 'red')
    .style('lineDash', [2, 2])
    .style('arrow', true);

  const lineY1 = chart
    .lineY()
    .style('stroke', 'green')
    .style('lineDash', [2, 2])
    .style('arrow', true);

  lineY.data([i * 100]).label([
    {
      text: `value = ${i * 100}`,
      position: 'right',
      dx: -10,
      textBaseline: 'bottom',
    },
  ]);

  lineY1.data([i * 200]).label([
    {
      text: `value = ${i * 200}`,
      position: 'right',
      dx: -10,
      textBaseline: 'bottom',
    },
  ]);

  chart.interaction('tooltip', {
    render: (e, { title, items }) => items[0].value,
  });

  const intervalId = setInterval(() => {
    i++;
    if (i > 2) {
      clearInterval(intervalId);
    }
    lineY.data([i * 100]).label([
      {
        text: `value = ${i * 100}`,
        position: 'right',
        dx: -10,
        textBaseline: 'bottom',
      },
    ]);
    lineY1.data([i * 200]).label([
      {
        text: `value = ${i * 200}`,
        position: 'right',
        dx: -10,
        textBaseline: 'bottom',
      },
    ]);
    chart.render();
  }, 10);
  const finished = chart.render();
  return {
    chart,
    finished,
  };
}
