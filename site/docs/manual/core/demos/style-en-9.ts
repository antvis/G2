/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'area',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
  },
  encode: { x: (d) => new Date(d.date), y: 'price' },
  style: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
});

chart.render();
