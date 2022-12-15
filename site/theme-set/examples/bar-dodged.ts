/**
 * A recreation of this demo: https://observablehq.com/@d3/stacked-horizontal-bar-chart
 */
import { Chart } from '@antv/g2';

export const BarDodged = (container, theme, plugins = []) => {
  const chart = new Chart({
    container,
    autoFit: true,
    paddingLeft: 50,
    plugins,
  });

  chart.theme({ type: theme });
  chart.interaction({ type: 'tooltip', shared: true });

  chart
    .interval()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
    .transform({ type: 'dodgeX' })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('color', 'age')
    .axis('y', { labelFormatter: '~s' })
    .legend('color', { size: 20 });

  chart.render();

  return chart;
};
