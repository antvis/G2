import { Chart } from '../../../src';

export function viewFacetCircle(context) {
  const { container, canvas } = context;

  const M = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  const N = ['A', 'B', 'C', 'D'];
  const data = M.flatMap((month, i) =>
    N.map((name, j) => ({
      month,
      name,
      value: i + j,
    })),
  );

  const chart = new Chart({
    container: container,
    canvas,
  });

  const facetCircle = chart
    .facetCircle()
    .data(data)
    .encode('position', 'month');

  facetCircle
    .interval()
    .encode('x', 'name')
    .encode('y', 'value')
    .encode('color', 'name');

  const finished = chart.render();

  return { chart, finished };
}
