/**
 * A recreation of this demo: https://observablehq.com/@d3/stacked-horizontal-bar-chart
 */
import { Chart } from '@antv/g2';

export const BarDodged = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.theme({ type: theme, ...tokens });

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
    .scale('y', { nice: true })
    .axis('y', { labelFormatter: '~s' })
    .interaction('tooltip', { shared: true });

  chart.render();

  return chart;
};
