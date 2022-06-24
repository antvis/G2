
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#3694', () => {
  const data = [
    { term: 'Zombieland', count: 9 },
  ];

  const chart = new Chart({
    container: createDiv(),
    autoFit: true,
    height: 500,
    padding: 50,
  });

  chart.data(data);

  chart.scale({
    count: {
      min: 1,
      max: 10,
    },
  });
  chart.tooltip(false)
  chart.coordinate('theta', {
    innerRadius: 0.7,
    radius: 1
  })

  chart
    .interval()
    .position('term*count')
    .shape('line')
    .style({
      lineAppendWidth: 10,
    }) // 线状柱状图
    .animate({
      update: {
        animation: 'wave-in', // 动画名称
        easing: 'easeQuadIn', // 动画缓动效果
        delay: 100, // 动画延迟执行时间
        duration: 500 // 动画执行时间
      },
    })


  chart.render();

  it('wave-in animation update', () => {
    const shape = chart.canvas.findAll((e) => e.cfg.type === 'path')[0];
    const path = shape.attr('path');

    chart.changeData([{
      count: 5,
      term: "Zombieland"
    }]);

    expect(path).not.toMatchObject(shape.attr('path'));
  });
});