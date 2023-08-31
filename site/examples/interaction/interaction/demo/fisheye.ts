import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
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
  .legend('size', false)
  .scale('size', { type: 'log', range: [4, 20] })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1);

chart.interaction('fisheye');

chart.render();
