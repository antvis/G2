import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

// .style('minWidth', 500)
chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: [{ letter: 'A', frequency: 120 }],
      encode: {
        x: 'letter',
        y: 'frequency',
      },
      scale: {
        x: { padding: 0.5 },
      },
      style: {
        maxWidth: 200,
      },
    },
  ],
});

chart.render();
