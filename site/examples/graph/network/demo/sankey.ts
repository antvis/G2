import { Chart } from '@antv/g2';
import { schemeTableau10 } from 'd3-scale-chromatic';

const chart = new Chart({
  container: 'container',
  width: 900,
  height: 600,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'sankey',
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
      scale: {
        color: { range: schemeTableau10 },
      },
      style: {
        labelSpacing: 3,
        labelFontWeight: 'bold',
        nodeLineWidth: 1.2,
        linkFillOpacity: 0.4,
      },
    },
  ],
});

chart.render();
