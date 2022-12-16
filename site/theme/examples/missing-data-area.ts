import { Chart } from '@antv/g2';

export const missingDataArea = (container, theme, plugins = []) => {
  const chart = new Chart({
    container,
    autoFit: true,
    plugins,
    paddingTop: 0,
  });

  chart.theme({ type: theme });

  chart.data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/aapl.json',
  });

  chart
    .area()
    .encode('x', (d) => new Date(d.date))
    // Mock missing data. Set NaN from Jan. to Mar.
    .encode('y', (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close))
    .style('connectNulls', true);

  chart.render();

  return chart;
};
