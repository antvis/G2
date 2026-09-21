import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
    transform: [
      {
        type: 'venn',
        padding: 12,
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
      style: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      transform: [{ type: 'contrastReverse' }],
    },
  ],
  style: {
    opacity: (d) => (d.sets.length > 1 ? 0.4 : 0.7),
    stroke: '#fff',
    lineWidth: 2,
  },
  scale: {
    color: {
      range: ['#667eea', '#764ba2', '#f093fb'],
    },
  },
  state: {
    inactive: { opacity: 0.1 },
    active: { opacity: 0.9 },
  },
  interactions: [{ type: 'elementHighlight' }],
  legend: false,
});

chart.render();
