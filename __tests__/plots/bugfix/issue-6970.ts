import { Chart } from '../../../src';

export function issue6970(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container: container,
    canvas: canvas,
    height: 300,
  });

  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'data/seattle-weather.csv',
    })
    .transform({ type: 'group', color: 'max' })
    .encode('x', (d) => new Date(d.date).getUTCDate())
    .encode('y', (d) => new Date(d.date).getUTCMonth())
    .encode('color', 'temp_max')
    .style('inset', 0.5)
    .scale('color', { palette: 'gnBu' })
    .animate('enter', { type: 'fadeIn' })
    .slider('y')
    .slider('x');

  const finished = chart.render();

  return { chart, finished };
}
