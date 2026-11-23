import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  width: 200,
  type: 'interval',
  scale: {
    color: { range: ['#222'] },
  },
  autoFit: true,
  data: [
    { letter: 'A', frequency: 8167 },
    { letter: 'B', frequency: 1492 },
    { letter: 'C', frequency: 2782 },
    { letter: 'D', frequency: 4253 },
    { letter: 'E', frequency: 2702 },
    { letter: 'H', frequency: 6094 },
    { letter: 'I', frequency: 2288 },
  ],
  encode: { x: 'letter', y: 'frequency', color: () => 'bar' },
  labels: [
    {
      text: 'frequency',
      transform: [
        {
          type: 'contrastReverse',
        },
      ],
    },
  ],
});

chart.render();
