// 欢迎使用全新的 G2 4.0
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#1518', () => {
  it('tooltip.showNil', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 500,
      height: 500,
      autoFit: false,
    });

    chart.data([
      { x: 'A', type: '分类一', value: 30 },
      { x: 'A', type: '分类二', value: 10 },
      { x: 'A', type: '分类三', value: null },
      { x: 'B', type: '分类一', value: 15 },
      { x: 'B', type: '分类二', value: undefined },
      { x: 'B', type: '分类三', value: 20 },
    ]);

    chart.interval().position('x*value').color('type').adjust('stack');

    chart.tooltip({
      shared: true,
      // showNil: true,
    });
    chart.render();
    chart.showTooltip({ x: 150, y: 150 });
    expect(chart.ele.querySelectorAll('.g2-tooltip-list-item').length).toBe(2);

    chart.hideTooltip();

    chart.tooltip({
      shared: true,
      showNil: true,
    });
    chart.render();
    chart.showTooltip({ x: 150, y: 150 });

    expect(chart.ele.querySelectorAll('.g2-tooltip-list-item').length).toBe(3);
    expect(chart.ele.querySelector('.g2-tooltip-list-item:nth-child(3) span:nth-child(3)').innerHTML).toBe('');

    chart.destroy();
  });
});
