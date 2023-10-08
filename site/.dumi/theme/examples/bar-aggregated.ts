import { Chart } from '@antv/g2';

export const barAggregated = ({ container, theme, width, height, tokens }) => {
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
        'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
    })
    .transform({
      type: 'groupX',
      y: 'max',
    })
    .encode('x', 'clarity')
    .encode('y', 'price')
    .encode('color', 'clarity')
    .axis('y', { labelFormatter: '~s' });

  chart.render();

  return chart;
};
