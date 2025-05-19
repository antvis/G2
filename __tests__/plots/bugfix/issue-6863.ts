import { Chart } from '../../../src';

export function issue6863(context) {
  const { container, canvas } = context;
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: 'Other', value: 5 },
  ];

  const chart = new Chart({
    container,
    autoFit: true,
    canvas,
  });

  chart
    .interval()
    .data(data)
    .encode('y', 'value')
    .encode('x', 'type')
    .encode('color', 'type');

  chart
    .connector()
    .data([
      {
        from: { category: '分类一', value: 27 },
        to: { category: '分类三', value: 18 },
      },
    ])
    .encode('x', (d) => [d.from.category, d.to.category])
    .encode('y', (d) => [d.from.value, d.to.value])
    .style({
      stroke: 'orange',
      lineWidth: 2,
      sourceOffsetX: 15,
      targetOffsetX: -20,
    });
  chart.render();

  return {
    chart,
    finished: Promise.resolve(),
  };
}
