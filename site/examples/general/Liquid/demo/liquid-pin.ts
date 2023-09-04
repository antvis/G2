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
    textStyle: {
      fill: '#fff',
    },
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  });

chart.render();
