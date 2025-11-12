import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  height: 400,
  data: [
    { item: 'Case 1', count: 40, percent: 0.4 },
    { item: 'Case 2', count: 21, percent: 0.21 },
    { item: 'Case 3', count: 17, percent: 0.17 },
    { item: 'Case 4', count: 13, percent: 0.13 },
    { item: 'Case 5', count: 9, percent: 0.09 },
  ],
  coordinate: { type: 'theta', outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'outside',
      fontSize: 12,
    },
    {
      text: (d) => `${(d.percent * 100).toFixed(0)}%`,
      position: 'inside',
      fontSize: 14,
      fontWeight: 'bold',
      fill: '#fff',
    },
  ],
  interaction: {
    elementHoverScale: true,
  },
});

chart.render();
