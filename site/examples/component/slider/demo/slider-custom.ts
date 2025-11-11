import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 150; i++) {
  data.push({
    x: i,
    y: Math.sin(i / 15) * 60 + 80 + Math.random() * 25,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
  });
}

chart.options({
  type: 'point',
  data,
  encode: { x: 'x', y: 'y', color: 'category' },
  slider: {
    x: {
      values: [0.1, 0.8],
      labelFormatter: (d) => `X: ${Math.round(d)}`,
      selectionFill: '#ff4d4f',
      selectionFillOpacity: 0.3,
      trackFill: '#f0f0f0',
      handleIconFill: '#1890ff',
      handleIconSize: 12,
    },
  },
  style: {
    fillOpacity: 0.8,
  },
});

chart.render();
