import { Chart } from '../../../src';

export function issue6710(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({
    container,
    canvas,
    autoFit: true,
  });

  const data = [
    { time: '10:10', call: 10, value: 2, name: 'people' },
    { time: '10:20', call: 10, value: 7, name: 'people' },
    // { time: '10:10', call: 10, value: 5, name: 'mock' },
    { time: '10:20', call: 10, value: 5, name: 'mock' },
    { time: '10:10', call: 10, value: 10, name: 'call' },
    { time: '10:20', call: 10, value: 10, name: 'call' },
  ];

  chart.data(data);

  chart
    .line()
    .encode('x', 'time')
    .encode('y', 'value')
    .encode('color', 'name')
    .scale('y', {
      independent: true,
      nice: true,
      domainMin: 0,
    })
    .axis('x', {
      title: null,
      tick: false,
      labelAutoHide: true,
      labelAlign: 'horizontal',
      labelAutoEllipsis: true,
      labelAutoWrap: false,
      labelAutoRotate: false,
    });

  const finished = chart.render();
  return { chart, finished };
}
