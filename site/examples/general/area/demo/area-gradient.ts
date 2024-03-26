/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/area_gradient.html
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/stocks.json',
  transform: [
    {
      type: 'filter',
      callback: (d) => d.symbol === 'GOOG',
    },
  ],
});

chart
  .area()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'price')
  .style('fill', 'linear-gradient(-90deg, white 0%, darkgreen 100%)');

chart
  .line()
  .encode('x', (d) => new Date(d.date))
  .encode('y', 'price')
  .style('stroke', 'darkgreen')
  .style('lineWidth', 2);

chart.render();
