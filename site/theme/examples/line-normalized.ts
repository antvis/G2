import { Chart } from '@antv/g2';

export const lineNormalized = (container, theme: string) => {
  const chart = new Chart({
    container,
    autoFit: true,
  });

  chart.theme({ type: theme });

  chart
    .line()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/indices.json',
    })
    .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
    .encode('x', (d) => new Date(d.Date))
    .encode('y', 'Close')
    .encode('color', 'Symbol')
    .scale('y', { type: 'log' })
    .axis('y', { title: '↑ Change in price (%)' })
    .legend('color', { size: 20 });

  chart.render();

  return chart;
};
