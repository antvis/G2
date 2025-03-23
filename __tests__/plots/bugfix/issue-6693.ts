import { Chart } from '../../../src';

export function issue6693(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({ container, canvas, autoFit: true });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'data/people.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')
    .encode('shape', 'hollowTriangleDown');

  const finished = chart.render();

  return { chart, finished };
}
