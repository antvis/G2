import { Chart } from '../../../src';

export function issues7121(context) {
  const { container, canvas } = context;

  const chart = new Chart({
    container,
    canvas,
    width: 900,
    height: 340,
  });

  chart
    .cell()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
      transform: [{ type: 'map', callback: (d: any) => ({ salary: d }) }],
    })
    .scale('color', {
      type: 'threshold',
      domain: [10000, 100000],
      range: ['#eee', 'pink', 'red'],
    })
    .encode('y', (_: any, i: number) => (i % 5) + 1)
    .encode('x', (_: any, i: number) => ((i / 5) | 0) + 1)
    .encode('color', 'salary')
    .style('stroke', '#000')
    .style('inset', 2)
    .animate('enter', { type: 'fadeIn' });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
