/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 350,
});

chart.options({
  type: 'view',
  autoFit: true,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/stocks.json',
    transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
  },
  children: [
    {
      type: 'area',
      encode: { x: (d) => new Date(d.date), y: 'price' },
      style: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
      // style: { fill: "linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)" },
    },
  ],
});

chart.render();
