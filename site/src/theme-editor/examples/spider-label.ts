import { Chart } from '@antv/g2';

export const spiderLabel = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'interval',
    coordinate: {
      type: 'theta',
      innerRadius: 0.25,
      outerRadius: 0.8,
    },
    theme: { type: theme, ...tokens },
    data: [
      { id: 'c', value: 526 },
      { id: 'sass', value: 220 },
      { id: 'php', value: 325 },
      { id: 'elixir', value: 561 },
      { id: 'rust', value: 54 },
    ],
    transform: [{ type: 'stackY' }],
    encode: { y: 'value', color: 'id' },
    labels: [
      {
        text: 'value',
        fontWeight: 'bold',
        offset: 14,
      },
      {
        text: 'id',
        position: 'outside',
        fontWeight: 'bold',
      },
    ],
    style: { stroke: '#fff', lineWidth: 1 },
    legend: false,
  });

  chart.render();

  return chart;
};
