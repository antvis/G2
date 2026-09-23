import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'boxplot',
  coordinate: { transform: [{ type: 'transpose' }] },
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/morley.json',
    transform: [{ type: 'filter', callback: (d) => d.Expt === 1 }],
  },
  encode: {
    y: 'Speed',
  },
  style: {
    boxFill: '#aaa',
    pointStroke: '#000',
  },
});

chart.render();
