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
        type: 'inline',
        value: [
          { sets: ['A'], size: 15, label: 'A' },
          { sets: ['B'], size: 12, label: 'B' },
          { sets: ['C'], size: 10, label: 'C' },
          { sets: ['A', 'B'], size: 2, label: 'A&B' },
          { sets: ['A', 'C'], size: 2, label: 'A&C' },
          { sets: ['B', 'C'], size: 1, label: 'B&C' },
          { sets: ['A', 'B', 'C'], size: 1 },
        ],
        transform: [
          {
            type: 'venn',
          },
        ],
      },
      encode: {
        d: 'path',
        color: 'key',
        shape: 'hollow',
      },
      labels: [
        {
          position: 'inside',
          text: (d) => d.label || '',
          fill: '#000',
        },
      ],
      style: {
        opacity: 0.6,
        lineWidth: 8,
      },
      tooltip: false,
    },
  ],
});

chart.render();
