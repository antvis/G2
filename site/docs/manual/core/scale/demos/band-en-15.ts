import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data: [
    { month: '2024-01', sales: 1200 },
    { month: '2024-02', sales: 1100 },
    { month: '2024-03', sales: 1350 },
    { month: '2024-04', sales: 1280 },
    { month: '2024-05', sales: 1400 },
    { month: '2024-06', sales: 1520 },
    { month: '2024-07', sales: 1680 },
    { month: '2024-08', sales: 1590 },
    { month: '2024-09', sales: 1450 },
    { month: '2024-10', sales: 1380 },
    { month: '2024-11', sales: 1250 },
    { month: '2024-12', sales: 1600 },
  ],
  encode: {
    x: 'month',
    y: 'sales',
    color: (d) => (d.sales > 1500 ? 'high' : d.sales > 1300 ? 'medium' : 'low'),
  },
  scale: {
    x: {
      type: 'band',
      padding: 0.1,
    },
    color: {
      domain: ['low', 'medium', 'high'],
      range: ['#faad14', '#1890ff', '#52c41a'],
    },
  },
});

chart.render();
