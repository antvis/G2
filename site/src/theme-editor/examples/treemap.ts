import { Chart } from '@antv/g2';

export const treemap = ({ container, theme, width, height, tokens }) => {
  const chart = new Chart({
    container,
    width,
    height,
  });

  chart.options({
    type: 'treemap',
    theme: { type: theme, ...tokens },
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
    },
    layout: {
      path: (d) => d.name.replace(/\./g, '/'),
      tile: 'treemapBinary',
      paddingInner: 0.5,
    },
    encode: {
      value: 'size',
      color: (d) => d.parent.data.name.split('.')[1],
    },
    legend: { color: { size: 20 } },
    style: { labelText: '' },
  });

  chart.render();

  return chart;
};
