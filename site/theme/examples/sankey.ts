import { Chart } from '@antv/g2';

export const sankey = (container, theme, plugins = []) => {
  const chart = new Chart({
    container,
    autoFit: true,
    plugins,
  });

  chart.theme({ type: theme });

  chart
    .sankey()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/energy.json',
      transform: [
        {
          type: 'custom',
          callback: (data) => ({ links: data }),
        },
      ],
    })
    .layout({
      nodeAlign: 'center',
      nodePadding: 0.03,
    })
    .style('labelSpacing', 3)
    .style('labelFontWeight', 'bold')
    // .style('labelTransform', { type: 'overlapHide' })
    .style('nodeStrokeWidth', 1.2)
    .style('linkFillOpacity', 0.4);

  chart.render();

  return chart;
};
