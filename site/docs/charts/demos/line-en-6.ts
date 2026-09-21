import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: [
    { quarter: 'Q1', value: 100 },
    { quarter: 'Q2', value: 101 },
    { quarter: 'Q3', value: 99 },
    { quarter: 'Q4', value: 102 },
  ],
  encode: { x: 'quarter', y: 'value' },
  axis: {
    x: { title: null },
    y: { title: null },
  },
  style: {
    lineWidth: 2,
    stroke: '#1890ff',
  },
});

chart.render();
