import { Chart } from '@antv/g2';

export const pointLog = ({ container, theme, width, height }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.theme({ type: theme });

  chart
    .point()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    })
    .encode('x', 'GDP')
    .encode('y', 'LifeExpectancy')
    .encode('size', 'Population')
    .encode('color', 'continent')
    .encode('shape', 'point')
    .scale('size', { type: 'log', range: [4, 20] })
    .style('fillOpacity', 0.3)
    .style('lineWidth', 1)
    .legend('size', false)
    .interaction('fisheye', true);

  chart.render();

  return chart;
};
