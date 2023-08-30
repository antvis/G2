import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  padding: 0,
});

chart.axis(false);

chart
  .image()
  .style(
    'src',
    'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
  )
  .style('x', '50%')
  .style('y', '50%')
  .style('width', '100%')
  .style('height', '100%')
  .tooltip(false);

chart
  .heatmap()
  .data({
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
  })
  .encode('x', 'g')
  .encode('y', 'l')
  .encode('color', 'tmp')
  .style('opacity', 0)
  .tooltip(false);

chart.render();
