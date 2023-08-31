import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
  insetLeft: 30,
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
  })
  .encode('x', 'GDP')
  .encode('y', 'LifeExpectancy')
  .encode('color', 'continent')
  .encode('size', 'Population')
  .encode('shape', 'point')
  .scale('size', { range: [4, 65] })
  .scale('y', { domain: [65, 90] })
  .style('fillOpacity', 0.3)
  .style('lineWidth', 1)
  .legend('size', false)
  .animate('enter', { type: 'zoomIn', duration: 1000 });

chart.render();
