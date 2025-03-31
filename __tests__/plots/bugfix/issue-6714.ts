import { Chart } from '../../../src';

export function issue6714(context) {
  const { container, canvas, callback } = context;
  const chart = new Chart({
    container,
    canvas,
  });

  chart.options({
    type: 'interval',
    autoFit: true,
    data: [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ],
    encode: { y: 'percent', color: 'item' },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta', outerRadius: 0.8 },
    legend: {
      color: { position: 'bottom', layout: { justifyContent: 'center' } },
    },
    tooltip: {
      items: [
        (data) => ({
          name: data.item,
          value: `${data.percent * 100}%`,
        }),
      ],
    },
  });

  const finished = chart.render();

  return {
    chart,
    finished,
  };
}
