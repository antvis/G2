import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container', height: 350 });

chart.options({
  type: 'line',
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
    transform: [
      // Mock missing data.
      {
        type: 'map',
        callback: (d) => ({
          ...d,
          count: ['2004'].includes(d.year) ? NaN : d.count,
        }),
      },
    ],
  },
  style: {
    gradient: 'x',
    gradientColor: 'start',
    lineJoin: 'round',
    connect: true,
    connectStroke: '#aaa',
    connectLineWidth: 1,
    connectLineDash: [2, 4],
    lineWidth: 3,
    opacity: 0.9,
    shadowColor: '#d3d3d3',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
  },
  encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
  scale: { y: { zero: true, nice: true } },
  axis: { y: { labelFormatter: '~s' } },
  labels: [
    {
      text: 'count',
    },
  ],
});

chart.render();
