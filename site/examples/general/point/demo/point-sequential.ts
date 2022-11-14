/**
 * A recreation of this demo: https://observablehq.com/@mbostock/global-temperature-trends
 */
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  paddingLeft: 60,
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/56b6b137-e04e-4757-8af5-d75bafaef886.csv',
  })
  .encode('x', 'date')
  .encode('y', 'value')
  .encode('color', 'value')
  .encode('shape', 'point')
  .scale('color', {
    type: 'sequential',
    palette: 'rdBu',
    offset: (t) => 1 - t,
  })
  .style('stroke', '#000')
  .style('strokeOpacity', 0.2);

chart.lineY().data([0]).style('stroke', '#000').style('strokeOpacity', 0.2);

chart.render();
