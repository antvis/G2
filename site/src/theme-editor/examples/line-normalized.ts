import { Chart } from '@antv/g2';

export const lineNormalized = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'line',
    theme: { type: theme, ...tokens },
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    },
    transform: [{ type: 'normalizeY', basis: 'first', groupBy: 'color' }],
    encode: { x: (d) => new Date(d.Date), y: 'Close', color: 'Symbol' },
    scale: { y: { type: 'log' } },
    axis: { y: { title: '↑ Change in price (%)' } },
  });

  chart.render();

  return chart;
};
