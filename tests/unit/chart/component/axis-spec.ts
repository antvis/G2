import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { createDiv } from '../../../util/dom';

describe('Axis', () => {
  it('rect x y', () => {
    const container = createDiv();
    const chart = new Chart({
      container,
      height: 500,
      autoFit: true,
      padding: 0,
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);

    chart.legend('name', {
      position: 'top',
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('dodge');
    chart.render();

    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const [x, y] = axes;

    const GAP = 1;

    expect(x.component.getBBox().maxY).toBeWithin(chart.height - GAP, chart.height + GAP);

    // y axis 绘制的锚点有 8px 的偏移
    expect(y.component.getBBox().minX).toBeWithin(-8 - GAP, -8 + GAP);

    expect(axes.length).toBe(2);
  });
});
