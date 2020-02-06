import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#1823', () => {
  it('group animate', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: false,
    });

    chart.data([
      { city: '杭州', sale: 100, category: '电脑' },
      { city: '广州', sale: 30, category: '电脑' },
      { city: '上海', sale: 110, category: '电脑' },
      { city: '呼和浩特', sale: 40, category: '电脑' },
      { city: '上海', sale: 200, category: '鼠标' },
      { city: '呼和浩特', sale: 10, category: '鼠标' },
      { city: '杭州', sale: 40, category: '鼠标' },
      { city: '广州', sale: 90, category: '鼠标' },
    ]);

    const interval = chart
      .interval()
      .position('city*sale')
      .color('category')
      .adjust({ type: 'dodge' });

    chart.render();
    chart.render();

    const container = interval.container;
    expect(container.attr('matrix')).toEqual([1, 0, 0, 0, 0.01, 0, 0, 249.48, 1]);
  });
});
