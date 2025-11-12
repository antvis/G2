import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const data = [];
for (let i = 0; i < 60; i++) {
  data.push({
    date: `Day-${i + 1}`,
    sales: Math.sin(i / 10) * 300 + 800 + Math.random() * 200,
    profit: Math.cos(i / 8) * 50 + 75 + Math.random() * 25,
    revenue: Math.sin(i / 12) * 800 + 1500 + Math.random() * 300,
  });
}

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'interval',
      encode: { x: 'date', y: 'sales' },
      scale: { y: { nice: true } },
      style: { fill: '#1890ff', fillOpacity: 0.6 },
    },
    {
      type: 'line',
      encode: { x: 'date', y: 'profit' },
      scale: {
        y: {
          key: 'y1',
          independent: true,
          nice: true,
        },
      },
      style: { stroke: '#ff4d4f', lineWidth: 3 },
    },
    {
      type: 'area',
      encode: { x: 'date', y: 'revenue' },
      scale: {
        y: {
          key: 'y2',
          independent: true,
          nice: true,
        },
      },
      style: { fill: '#52c41a', fillOpacity: 0.4 },
    },
  ],
  slider: {
    x: {
      labelFormatter: (d) => d,
    },
  },
});

chart.render();
