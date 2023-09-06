import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender')
  .encode('shape', 'point')
  .style({
    fillOpacity: 0.7,
    transform: 'scale(1, 1)',
    transformOrigin: 'center center',
  })
  .state('inactive', {
    fill: 'black',
    fillOpacity: 0.5,
    transform: 'scale(0.5, 0.5)',
  })
  .interaction('brushHighlight', true);

chart.render();
