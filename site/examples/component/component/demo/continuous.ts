import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  theme: 'classic',
  height: 300,
});

chart
  .cell()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  })
  .transform({ type: 'group', color: 'max' })
  .encode('x', (d) => new Date(d.date).getUTCDate())
  .encode('y', (d) => new Date(d.date).getUTCMonth())
  .encode('color', 'temp_max')
  .style('inset', 0.5)
  .scale('color', {
    type: 'sequential',
    palette: 'rainbow',
  })
  .legend({
    color: {
      length: 500,
      position: 'bottom',
      ribbonType: 'size',
      showIndicator: true,
      showTitle: false,
      showTick: false,
      layout: {
        justifyContent: 'center',
      },
    },
  });

chart.render();
