/**
 * A recreation of this demo: https://observablehq.com/@d3/line-with-missing-data
 */
import { Chart } from '@antv/g2';

export const lineConnectNulls = ({
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

  chart.theme({ type: theme, ...tokens });

  chart
    .line()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
      transform: [
        // Mock missing data.
        {
          type: 'map',
          callback: (d) => ({
            ...d,
            close: d.date.getUTCMonth() < 3 ? NaN : d.close,
          }),
        },
      ],
    })
    .encode('x', 'date')
    .encode('y', 'close')
    .scale('y', { nice: true })
    .style('connectNulls', true);

  chart.render();

  return chart;
};
