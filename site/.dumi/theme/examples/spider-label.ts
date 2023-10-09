import { Chart } from '@antv/g2';

export const spiderLabel = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.coordinate({
    type: 'theta',
    innerRadius: 0.25,
    outerRadius: 0.8,
  });

  chart.theme({ type: theme, ...tokens });

  chart
    .interval()
    .data([
      { id: 'c', value: 526 },
      { id: 'sass', value: 220 },
      { id: 'php', value: 325 },
      { id: 'elixir', value: 561 },
      { id: 'rust', value: 54 },
    ])
    .transform({ type: 'stackY' })
    .encode('y', 'value')
    .encode('color', 'id')
    .label({
      text: 'value',
      fontWeight: 'bold',
      offset: 14,
    })
    .label({
      text: 'id',
      position: 'outside',
      fontWeight: 'bold',
    })
    .style('stroke', '#fff')
    .style('lineWidth', 1)
    .legend(false);

  chart.render();

  return chart;
};
