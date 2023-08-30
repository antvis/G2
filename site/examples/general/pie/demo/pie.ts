/**
 * A recreation of this demo: https://observablehq.com/@d3/pie-chart
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  height: 640,
});

chart.coordinate({ type: 'theta' });

chart
  .interval()
  .transform({ type: 'stackY' })
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
  })
  .encode('y', 'value')
  .encode('color', 'name')
  .style('stroke', 'white')
  .scale('color', {
    palette: 'spectral',
    offset: (t) => t * 0.8 + 0.1,
  })
  .label({
    text: 'name',
    radius: 0.8,
    fontSize: 10,
    fontWeight: 'bold',
  })
  .label({
    text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
    radius: 0.8,
    fontSize: 9,
    dy: 12,
  })
  .animate('enter', { type: 'waveIn' })
  .legend(false);

chart.render();
