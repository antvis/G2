import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart
  .liquid()
  .data({
    value: {
      percent: 0.7,
    },
  })
  .style({
    // 内置形状 rect 矩形、 circle 圆形、pin 水滴、diamond 菱形、triangle 三角
    shape: 'pin',
    textFill: '#fff',
    outlineBorder: 4,
    outlineDistance: 8,
    waveLength: 128,
  });

chart.render();
