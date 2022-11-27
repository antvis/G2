import { Chart } from '@antv/g2';
import { regressionLog } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});
const dataLogarithmic = [
  { x: 1, y: 4.181 },
  { x: 2, y: 4.665 },
  { x: 3, y: 5.296 },
  { x: 4, y: 5.365 },
  { x: 5, y: 5.448 },
  { x: 6, y: 5.744 },
  { x: 7, y: 5.653 },
  { x: 8, y: 5.844 },
  { x: 9, y: 6.362 },
  { x: 10, y: 6.38 },
  { x: 11, y: 6.311 },
  { x: 12, y: 6.457 },
  { x: 13, y: 6.479 },
  { x: 14, y: 6.59 },
  { x: 15, y: 6.74 },
  { x: 16, y: 6.58 },
  { x: 17, y: 6.852 },
  { x: 18, y: 6.531 },
  { x: 19, y: 6.682 },
  { x: 20, y: 7.013 },
  { x: 21, y: 6.82 },
  { x: 22, y: 6.647 },
  { x: 23, y: 6.951 },
  { x: 24, y: 7.121 },
  { x: 25, y: 7.143 },
  { x: 26, y: 6.914 },
  { x: 27, y: 6.941 },
  { x: 28, y: 7.226 },
  { x: 29, y: 6.898 },
  { x: 30, y: 7.392 },
  { x: 31, y: 6.938 },
];

chart.data(dataLogarithmic);

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'point')
  .scale('x', { domain: [0, 35] })
  .style('fillOpacity', 0.75)
  .axis('x', { title: false })
  .axis('y', { title: false });

const logRegression = regressionLog()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([0.81, 35]);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: logRegression,
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'smooth')
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .label({
    text: 'y = 0.881·ln(x) + 4.173\nThe coefficient of determination, or R^22, is 0.958',
    selector: 'last',
    textAlign: 'end',
  });

chart.render();
