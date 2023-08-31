/**
 * A recreation of this demo: https://observablehq.com/@d3/dot-plot
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  width: 800,
  height: 1200,
});

const xy = (node) => node.encode('x', 'state').encode('y', 'population');

chart.coordinate({ transform: [{ type: 'transpose' }] });

chart.data({
  type: 'fetch',
  value:
    'https://gw.alipayobjects.com/os/bmw-prod/b6f2ff26-b232-447d-a613-0df5e30104a0.csv',
});

chart
  .link()
  .scale('y', { labelFormatter: '.0%' })
  .transform({ type: 'groupX', y: 'min', y1: 'max' })
  .call(xy)
  .style('stroke', '#000')
  .tooltip(false);

chart
  .point()
  .scale('color', { palette: 'spectral' })
  .call(xy)
  .encode('shape', 'point')
  .encode('color', 'age')
  .tooltip({
    title: 'state',
    items: ['population'],
  });

chart.interaction('tooltip', { shared: true });

chart.render();
