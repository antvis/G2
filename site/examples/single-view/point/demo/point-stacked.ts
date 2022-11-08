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
  .transform({ type: 'stackY' })
  .encode('x', (d) => 2021 - d.birth)
  .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
  .encode('color', 'gender')
  .encode('shape', 'point')
  .scale('color', { field: 'Gender' })
  .scale('x', { field: 'Age →', nice: true })
  .scale('y', {
    field: '← Women · Men →',
    formatter: (d) => `${Math.abs(+d)}`,
  });

chart.lineY().data([0]).style('stroke', 'black');

chart.render();
