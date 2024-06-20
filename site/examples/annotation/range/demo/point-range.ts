/**
 * A recreation of this demo: https://www.anychart.com/zh/products/anychart/gallery/Quadrant_Charts/Top_30_Countries_by_Quality_of_Life.php
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .data({
    type: 'fetch',
    value:
      'https://assets.antv.antgroup.com/g2/top-30-countries-by-quality-of-life.json',
  })
  .axis('x', false)
  .axis('y', false)
  .style('mainStroke', '#5B8FF9')
  .style('mainLineWidth', 2);

chart
  .range()
  .data([
    { x: [0, 0.5], y: [0, 0.5] },
    { x: [0.5, 1], y: [0.5, 1] },
  ])
  .encode('x', 'x')
  .encode('y', 'y')
  .scale('x', { independent: true, domain: [0, 1] })
  .scale('y', { independent: true, domain: [0, 1] })
  .style('stroke', '#5B8FF9')
  .style('lineWidth', 1)
  .style('fillOpacity', 0.15)
  .animate(false)
  .tooltip(false);

chart
  .point()
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('shape', 'point')
  .scale('x', { domain: [137.5, 212] })
  .scale('y', { domain: [0, 80] })
  .label({ text: 'name', fontSize: 10, dy: 6 });

chart.render();
