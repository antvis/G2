import 'jest-extended';
import { COMPONENT_TYPE, DIRECTION } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

describe('legend update', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
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

  const interval = chart
    .interval()
    .position('月份*月均降雨量')
    .color('name')
    .adjust('dodge');
  chart.render();

  function getLegends() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);
  }

  it('legend update', async () => {
    let legends = getLegends();
    expect(legends.length).toBe(1);
    expect(legends[0].direction).toBe(DIRECTION.TOP);
    expect(legends[0].component.get('position')).toBe('top');

    const legend = legends[0];

    await delay(500);

    chart.legend('name', {
      position: 'right',
    });
    chart.render(true);

    legends = getLegends();
    expect(legends.length).toBe(1);

    // 更新逻辑保持引用
    expect(legends[0]).toBe(legend);
    expect(legends[0].component.get('position')).toBe('right');
    expect(legends[0].direction).toBe(DIRECTION.RIGHT);
  });

  it('legend delete', async () => {
    const legend = getLegends()[0];

    await delay(500);

    interval.color('月份');
    chart.legend('月份', {
      position: 'bottom',
    });

    chart.render(true);

    // 组件被销毁
    expect(legend.component.destroyed).toBe(true);

    const legends = getLegends();
    expect(legends.length).toBe(1);
    // 因为删除了，所以不保持引用
    expect(legends[0]).not.toBe(legend);
    expect(legends[0].component.get('position')).toBe('bottom');
    expect(legends[0].direction).toBe(DIRECTION.BOTTOM);
  });
});
