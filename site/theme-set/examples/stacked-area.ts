import { Chart } from '@antv/g2';

export const stackedArea = (container, theme, plugins = []) => {
  const chart = new Chart({
    container,
    autoFit: true,
    plugins,
    paddingLeft: 60,
  });

  chart.theme({ type: theme });

  chart.data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
  });

  chart
    .area()
    .transform([
      { type: 'stackY' }, // Try to remove this line.
    ])
    .encode('x', (d) => new Date(d.date))
    .encode('y', 'unemployed')
    .encode('color', 'industry')
    .encode('shape', 'smooth')
    .legend('color', { size: 20 });

  chart.render();

  return chart;
};
