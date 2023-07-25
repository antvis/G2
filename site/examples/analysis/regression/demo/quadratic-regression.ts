/**
 * A recreation of this demo: https://observablehq.com/@harrystevens/introducing-d3-regression#quadratic
 */
import { Chart } from '@antv/g2';
import { regressionQuad } from 'd3-regression';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.data([
  { x: -3, y: 7.5 },
  { x: -2, y: 3 },
  { x: -1, y: 0.5 },
  { x: 0, y: 1 },
  { x: 1, y: 3 },
  { x: 2, y: 6 },
  { x: 3, y: 14 },
]);

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'point')
  .scale('x', { domain: [-4, 4] })
  .scale('y', { domain: [-2, 14] })
  .style('fillOpacity', 0.75)
  .axis('x', { title: false })
  .axis('y', { title: false });

const regression = regressionQuad()
  .x((d) => d.x)
  .y((d) => d.y)
  .domain([-4, 4]);

chart
  .line()
  .data({
    transform: [
      {
        type: 'custom',
        callback: regression,
      },
    ],
  })
  .encode('x', (d) => d[0])
  .encode('y', (d) => d[1])
  .style('stroke', '#30BF78')
  .style('lineWidth', 2)
  .tooltip(false);

chart.lineX().data([0]);
chart.lineY().data([0]);

chart.render();
