/**
 * A recreation of this demo: http://benfred.github.io/venn.js/examples/intersection_tooltip.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'path',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
        transform: [
          {
            type: 'venn',
            padding: 8,
            sets: 'sets',
            size: 'size',
            as: ['key', 'path'],
          },
        ],
      },
      encode: {
        d: 'path',
        color: 'key',
      },
      labels: [
        {
          position: 'inside',
          text: (d) => d.label || '',
          transform: [{ type: 'contrastReverse' }],
        },
      ],
      style: {
        opacity: (d) => (d.sets.length > 1 ? 0.001 : 0.5),
      },
      state: {
        inactive: { opacity: 0.2 },
        active: { opacity: 0.8 },
      },
      interaction: {
        elementHighlight: true,
      },
      legend: false,
    },
  ],
});

chart.render();
