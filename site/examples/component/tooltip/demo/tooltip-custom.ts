import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  inset: 6,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'boxplot',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/morley.json',
      },
      encode: {
        x: 'Expt',
        y: 'Speed',
      },
      tooltip: {
        items: [
          { name: 'min', channel: 'y' },
          { name: 'q1', channel: 'y1' },
          { name: 'q2', channel: 'y2' },
          { name: 'q3', channel: 'y3' },
          { name: 'max', color: 'red', channel: 'y4' },
        ],
      },
    },
  ],
});

chart.render();
