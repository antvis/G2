import { Chart } from '@antv/g2';

export const stackedArea = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.theme({ type: theme, ...tokens });

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
    .legend(false);

  chart.render();

  return chart;
};
