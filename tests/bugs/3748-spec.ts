
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#3748', () => {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  const chart = new Chart({
    container: createDiv(), // 指定图表容器 ID
    height: 300, // 指定图表高度
    autoFit: true
  });

  chart.data(data);

  chart.interval({
    background: {}
  }).position('genre*sold').color('genre');

  // Step 4: 渲染图表
  chart.render();

  it('interval rect return', () => {
    expect(chart.canvas.findAllByName('interval')[0].getParent().cfg.name[1]).toBe('interval-group');
  });
});