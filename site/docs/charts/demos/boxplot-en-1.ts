import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
});

chart.options({
  type: 'boxplot',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
  },
  encode: {
    x: 'Expt',
    y: 'Speed',
  },
  style: {
    boxFill: '#1890ff',
    boxFillOpacity: 0.3,
    pointStroke: '#f5222d',
    pointR: 3,
  },
});

chart.render();
