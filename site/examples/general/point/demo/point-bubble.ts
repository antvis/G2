/**
 * A recreation of this demo: https://vega.github.io/vega-lite/examples/circle_natural_disasters.html
 */

import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
    transform: [
      {
        type: 'filter',
        callback: (d) => d.Entity !== 'All natural disasters',
      },
    ],
  })
  .encode('x', 'Year')
  .encode('y', 'Entity')
  .encode('size', 'Deaths')
  .encode('color', 'Entity')
  .encode('shape', 'point')
  .scale('size', { rangeMax: 35 })
  .legend(false)
  .style({
    stroke: 'black',
    strokeOpacity: 0.1,
    opacity: 0.8,
    lineWidth: 1,
  });

chart.render();
