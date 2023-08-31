/**
 * A recreation of this demo: https://observablehq.com/@mbostock/global-temperature-trends
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 360,
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
  })
  .transform({ type: 'stackY', y1: 'y' })
  .encode('x', (d) => 2021 - d.birth)
  .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
  .encode('color', 'gender')
  .encode('shape', 'point')
  .scale('x', { nice: true })
  .axis('y', {
    title: '← Women · Men →',
    labelFormatter: (d) => `${Math.abs(+d)}`,
  })
  .axis('x', { title: 'Age →' })
  .legend('color', { title: 'Gender' })
  .tooltip({ channel: 'x', name: 'age' });

chart.lineY().data([0]).style('stroke', 'black');

chart.render();
