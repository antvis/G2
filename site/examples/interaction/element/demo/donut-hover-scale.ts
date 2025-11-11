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
  coordinate: { type: 'theta', innerRadius: 0.5, outerRadius: 0.8 },
  transform: [{ type: 'stackY' }],
  encode: {
    y: 'percent',
    color: 'item',
  },
  legend: { color: { position: 'bottom' } },
  labels: [
    {
      text: 'item',
      position: 'spider',
      fontSize: 12,
    },
  ],
  interaction: {
    elementHoverScale: {
      scale: 1.08,
      shadow: true,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 15,
    },
  },
});

chart.render();
