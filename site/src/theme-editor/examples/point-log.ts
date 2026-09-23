import { Chart } from '@antv/g2';

export const pointLog = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'point',
    theme: { type: theme, ...tokens },
    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
    },
    encode: {
      x: 'GDP',
      y: 'LifeExpectancy',
      size: 'Population',
      color: 'continent',
      shape: 'point',
    },
    scale: {
      size: { type: 'log', range: [4, 20] },
      x: { nice: true },
      y: { nice: true },
    },
    style: { fillOpacity: 0.3, lineWidth: 1 },
    legend: { size: false },
    interaction: { fisheye: true },
  });

  chart.render();

  return chart;
};
