import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
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
        color: 'letter',
      },
      labels: [
        {
          text: 'frequency',
          position: 'inside',
          formatter: '.0%',
          fill: '#000',
          transform: [
            {
              type: 'contrastReverse',
              threshold: 21,
              palette: ['#000', '#fff'], // Use full color string to avoid screenshot error.
            },
          ],
        },
      ],
    },
  ],
});

chart.render();
