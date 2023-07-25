import { Chart } from '@antv/g2';
import { regressionPoly } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

const dataPolynomial = [
  { x: 0, y: 140 },
  { x: 1, y: 149 },
  { x: 2, y: 159.6 },
  { x: 3, y: 159 },
  { x: 4, y: 155.9 },
  { x: 5, y: 169 },
  { x: 6, y: 162.9 },
  { x: 7, y: 169 },
  { x: 8, y: 180 },
];

chart.data(dataPolynomial);

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'point')
  .style('fillOpacity', 0.75)
  .axis('x', { title: false })
  .axis('y', { title: false });

const polyRegression = regressionPoly()
  .x((d) => d.x)
  .y((d) => d.y);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: polyRegression,
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .encode('shape', 'smooth')
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .label({
    text: 'y=0.24x^3 + −3.00x^2 + 13.45x + 139.77\nThe coefficient of determination, or R^2, is 0.92',
    selector: 'last',
    textAlign: 'end',
    dx: -8,
  })
  .tooltip(null);

chart.render();
