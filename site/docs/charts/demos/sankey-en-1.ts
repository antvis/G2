import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'sankey',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/energy.json',
    transform: [
      {
        type: 'custom',
        callback: (data) => ({ links: data }),
      },
    ],
  },
  layout: {
    nodeAlign: 'center',
    nodePadding: 0.03,
  },
  style: {
    labelSpacing: 3,
    labelFontWeight: 'bold',
    nodeStrokeWidth: 1.2,
    linkFillOpacity: 0.4,
  },
});

chart.render();
