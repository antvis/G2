/**
 * A recreation of this demo:
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
  padding: 0,
  inset: 50,
});

chart.coordinate({ type: 'theta', innerRadius: 0.6 });

chart
  .interval()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
  })
  .transform({ type: 'stackY' })
  .encode('y', 'value')
  .encode('color', 'name')
  .scale('color', {
    palette: 'spectral',
    offset: (t) => t * 0.8 + 0.1,
  })
  .legend(false);

chart
  .text()
  .style('text', 'Donut')
  // Relative position
  .style('x', '50%')
  .style('y', '50%')
  .style('fontSize', 40)
  .style('fontWeight', 'bold')
  .style('textAlign', 'center');

chart
  .text()
  .style('text', 'chart')
  // Absolute position
  .style('x', 640 / 2 - 16)
  .style('y', 360)
  .style('fontSize', 20)
  .style('fontWeight', 'bold')
  .style('textAlign', 'center');

chart.render();
