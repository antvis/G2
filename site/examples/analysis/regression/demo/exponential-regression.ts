/**
 * A recreation of this demo: https://echarts.apache.org/examples/zh/editor.html?c=scatter-exponential-regression
 */
import { Chart } from '@antv/g2';
import { regressionExp } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data([
  [1, 4862.4],
  [2, 5294.7],
  [3, 5934.5],
  [4, 7171.0],
  [5, 8964.4],
  [6, 10202.2],
  [7, 11962.5],
  [8, 14928.3],
  [9, 16909.2],
  [10, 18547.9],
  [11, 21617.8],
  [12, 26638.1],
  [13, 34634.4],
  [14, 46759.4],
  [15, 58478.1],
  [16, 67884.6],
  [17, 74462.6],
  [18, 79395.7],
]);

chart
  .point()
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'point')
  .scale('x', { domain: [0, 18] })
  .scale('y', { domain: [0, 100000] })
  .style('fillOpacity', 0.75);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: regressionExp(),
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'smooth')
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .label({
    text: 'y = 3477.32^(0.18x)\nThe coefficient of determination, or R^2, is 0.998',
    selector: 'last',
    textAlign: 'end',
  });

chart.render();
