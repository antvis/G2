import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  })
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('size', 'Population')
  .encode('color', 'continent')
  .encode('shape', 'point')
  .scale('size', { type: 'log', range: [4, 20] })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1)
  .legend('size', false);

chart.render();
