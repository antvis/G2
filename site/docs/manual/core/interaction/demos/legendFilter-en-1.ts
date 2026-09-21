import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart.options({
  type: 'line',
  autoFit: true,
  height: 300,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
  },
  encode: {
    x: (d) => new Date(d.date),
    y: 'value',
    color: 'condition',
  },
});

chart.render();
