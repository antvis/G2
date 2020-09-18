import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('2841 syncViewPadding', () => {
  it('2841', () => {
    const data = [
      { name: 'a', time: '10:10', call: 4, waiting: 2, people: 2 },
      { name: 'b', time: '10:10', call: 4, waiting: 21, people: 2 },
      { name: 'a', time: '10:15', call: 2, waiting: 6, people: 3 },
      { name: 'b', time: '10:15', call: 2, waiting: 16, people: 3 },
      { name: 'a', time: '10:20', call: 13, waiting: 2, people: 5 },
      { name: 'b', time: '10:20', call: 13, waiting: 12, people: 5 },
      { name: 'a', time: '10:25', call: 9, waiting: 9, people: 1 },
      { name: 'b', time: '10:25', call: 9, waiting: 19, people: 1 },
    ];
    const chart = new Chart({
      container: createDiv(),
      width: 400,
      height: 300,
      autoFit: true,
      syncViewPadding: true,
    });
    chart.data(data);
    chart.tooltip({
      shared: true,
    });

    const v1 = chart.createView();
    v1.line().position('time*people').color('#fdae6b').size(3).shape('smooth');

    v1.axis('people', { position: 'left' });

    const v2 = chart.createView();
    v2.interval()
      .position('time*waiting')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 1 / 32,
        },
      ]);
    v2.axis('waiting', { position: 'right' });

    chart.render();

    // xy 坐标轴都显示
    expect(v1.getComponents().filter((co) => co.type === 'axis').length).toBe(2);
    expect(v2.getComponents().filter((co) => co.type === 'axis').length).toBe(2);

    // 因为同步，所以使用同一个实例 autoPadding
    expect(v1.autoPadding).toBe(v2.autoPadding);

    // legend 在 x 轴的下方
    expect(chart.getComponents()[0].component.getBBox().minY).toBeGreaterThan(v1.getComponents()[0].component.getBBox().maxY);

    // v1 v2 的 axis 轴坐标一模一样
    expect(v1.getComponents()[0].component.getBBox()).toEqual(v2.getComponents()[0].component.getBBox());
  });
});
