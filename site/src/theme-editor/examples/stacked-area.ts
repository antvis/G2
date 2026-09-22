import { Chart } from '@antv/g2';

export const stackedArea = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'area',
    theme: { type: theme, ...tokens },
    data: {
      type: 'fetch',
      value:
        'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
    },
    transform: [
      { type: 'stackY' }, // Try to remove this line.
    ],
    encode: {
      x: (d) => new Date(d.date),
      y: 'unemployed',
      color: 'industry',
      shape: 'smooth',
    },
    legend: false,
  });

  chart.render();

  return chart;
};
