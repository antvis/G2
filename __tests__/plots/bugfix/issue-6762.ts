import { Chart } from '../../../src';

export function issue6762(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({
    container,
    canvas,
  });

  chart
    .data({
      type: 'fetch',
      value:
        ' https://gw.alipayobjects.com/os/bmw-prod/474e51c8-b47b-4bb6-b3ed-87813a960df2.csv',
    })
    .encode('x', 'mpg')
    .encode('y', 'hp')
    .encode('color', 'mpg');

  chart.point().encode('shape', 'point').encode('size', 6).tooltip(false);

  chart.line().interaction('tooltip', {
    crosshairs: true,
  });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
