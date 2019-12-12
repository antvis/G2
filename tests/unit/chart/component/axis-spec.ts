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
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('dodge');
    chart.render();

    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);

    expect(axes.length).toBe(2);
  });
});
