import 'jest-extended';
import { COMPONENT_TYPE, DIRECTION } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

const data = [
  { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
  { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
  { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
  { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
  { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
  { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
];

describe('axis update', () => {
  const container = createDiv();
  const chart = new Chart({
    container,
    height: 500,
    width: 600,
    autoFit: false,
    padding: 10,
  });

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

  function getGrids() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
  }

  it('axis update', async () => {
    let axes = getAxes();
    expect(axes.length).toBe(2);

    const [x, y] = axes;
    expect(x.component.get('ticks').length).toBe(3);

    await delay(2000);

    chart.axis('月份', {
      title: {
        style: {
          fill: 'red',
          text: '月份',
        },
        offset: 0,
        autoRotate: true,
      },
    });

    chart.changeData(data.slice(0, 2));

    chart.render(true);

    axes = getAxes();
    expect(axes.length).toBe(2);

    // 更新逻辑保持引用
    expect(axes[0]).toBe(x);
    expect(axes[1]).toBe(y);
    // 修改配置生效
    expect(axes[0].component.get('title').style.fill).toBe('red');
    expect(axes[0].component.get('ticks').length).toBe(2);
  });

  it('legend delete', async () => {
    const [x, y] = getAxes();
    await delay(2000);

    chart.axis('月份', false);

    chart.render(true);

    // 组件被销毁
    expect(x.component.destroyed).toBe(true);

    const axes = getAxes();
    expect(axes.length).toBe(1);
    // 因为删除了，所以不保持引用
    expect(axes[0]).not.toBe(x);
    expect(axes[0]).toBe(y);
  });
});
