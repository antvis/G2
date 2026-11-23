import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'line',
  autoFit: true,
  data: [
    { month: 'Jan', value: 51 },
    { month: 'Feb', value: 91 },
    { month: 'Mar', value: 34 },
    { month: 'Apr', value: 47 },
    { month: 'May', value: 63 },
    { month: 'June', value: 58 },
    { month: 'July', value: 56 },
    { month: 'Aug', value: 77 },
    { month: 'Sep', value: 99 },
    { month: 'Oct', value: 106 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 56 },
  ],
  encode: { x: 'month', y: 'value', shape: 'hv' },
  axis: {
    x: {
      title: null,
    },
    y: {
      title: null,
    },
  },
  style: {
    lineWidth: 2,
    stroke: '#1890ff',
  },
});

chart.render();
