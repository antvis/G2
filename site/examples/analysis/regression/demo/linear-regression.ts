/**
 * A recreation of this demo: https://echarts.apache.org/examples/zh/editor.html?c=scatter-linear-regression
 */
import { Chart } from '@antv/g2';
import { regressionLinear } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data({
  type: 'fetch',
  value: 'https://assets.antv.antgroup.com/g2/linear-regression.json',
});

chart
  .point()
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'point')
  .scale('x', { domain: [0, 1] })
  .scale('y', { domain: [0, 5] })
  .style('fillOpacity', 0.75);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: regressionLinear(),
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .label({
    text: 'y = 1.7x+3.01',
    selector: 'last',
    position: 'right',
    textAlign: 'end',
    dy: -8,
  })
  .tooltip(false);

chart.render();
