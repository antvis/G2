import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .line()
  .data({
    type: 'fetch',
    value:
      'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
  })
  .encode('x', 'letter')
  .encode('y', 'frequency')
  .axis('y', { labelFormatter: '.0%' })
  .interaction('tooltip', {
    disableNative: true, // Disable pointerover and pointerout events.
    bounding: {
      x: -Infinity,
      y: -Infinity,
      width: Infinity,
      height: Infinity,
    },
    mount: 'body',
  });

chart.on('plot:click', ({ offsetX, target }) => {
  chart.emit('tooltip:show', { offsetX, offsetY: 20, target });
});

chart.render();
