/**
 * A recreation of this demo: https://canisjs.github.io/canis-editor/index.html?exmp=polio_1
 */
import { Chart } from '@antv/g2';
import { interpolateHcl } from 'd3-interpolate';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.style('plotFill', '#000');

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/polio.json',
  })
  .encode('x', 'x')
  .encode('y', 'y')
  .encode('color', 'Polio Cases')
  .encode('shape', 'point')
  .transform({
    type: 'stackEnter',
    groupBy: ['x', 'y'],
    orderBy: 'color',
    duration: 2000,
  })
  .legend('color', false)
  .scale('y', { range: [0, 1] })
  .scale('color', {
    type: 'sqrt',
    range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
    interpolate: interpolateHcl,
  })
  .attr('padding', 0)
  .axis(false);

chart
  .text()
  .style('text', 'Polio incidence rates')
  .style('x', '50%')
  .style('y', '50%')
  .style('textAlign', 'center')
  .style('fontSize', 24)
  .style('fill', '#666')
  .animate('enter', { delay: 2000 });

chart
  .text()
  .style('text', 'United States, 1950s')
  .style('x', '50%')
  .style('y', '50%')
  .style('textAlign', 'center')
  .style('fontSize', 18)
  .style('fill', '#666')
  .style('dy', '30')
  .animate('enter', { delay: 2400 });

chart.render();
