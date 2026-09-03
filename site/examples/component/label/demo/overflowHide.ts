import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  autoFit: false,
});

chart.options({
  type: 'view',
  children: [
    {
      type: 'interval',
      data: {
        type: 'fetch',
        value: 'https://assets.antv.antgroup.com/g2/alphabet.json',
      },
      encode: {
        x: 'letter',
        y: 'frequency',
        color: 'steelblue',
      },
      axis: {
        y: { labelFormatter: '.0%' },
      },
      labels: [
        {
          text: 'frequency',
          position: 'inside',
          formatter: '.0%',
          transform: [{ type: 'overflowHide' }],
        },
      ],
    },
  ],
});

chart.render();
