import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

// rect
describe('axis changeSize update', () => {
  const container = createDiv();
  const data = [
    {name: 'London', 月份: 'Jan.', 月均降雨量: 18.9},
    {name: 'London', 月份: 'Feb.', 月均降雨量: 28.8},
    {name: 'London', 月份: 'Mar.', 月均降雨量: 39.3},
    {name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4},
    {name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2},
    {name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5},
  ];

  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    autoFit: false,
    padding: 48,
  });

  // chart.animate(false);
  chart.data(data);

  const interval = chart
    .interval()
    .position('月份*月均降雨量')
    .color('name')
    .adjust('dodge');
  chart.render();

  function getAxes() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
  }

  it('changeSize', async () => {
    await delay(1000);

    chart.scale('月均降雨量', {
      min: 0,
      max: 50,
    });

    chart.changeSize(400, 300);

    const [x, y] = getAxes();
    await delay(500); // 等待动画完成

    const bbox = y.component.getBBox();

    // 绘制在画布中
    expect(bbox.x).toBeGreaterThan(0);
    expect(bbox.y).toBeGreaterThan(0);
  });
});
