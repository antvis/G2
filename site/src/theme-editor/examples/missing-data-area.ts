import { Chart } from '@antv/g2';

export const missingDataArea = ({
  container,
  theme,
  width,
  height,
  tokens,
}) => {
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
      value: 'https://assets.antv.antgroup.com/g2/aapl.json',
    },
    encode: {
      x: (d) => new Date(d.date),

      // Mock missing data. Set NaN from Jan. to Mar.
      y: (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close),
    },
    scale: { y: { nice: true } },
    style: { connect: true, connectFill: 'grey', connectFillOpacity: 0.15 },
  });

  chart.render();

  return chart;
};
