import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

// rect
describe.skip('axis rect update', () => {
  const container = createDiv();
  const data = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
  ];

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

    await delay(100);

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

  it('axis delete', async () => {
    const [x, y] = getAxes();
    await delay(100);

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

// polar
describe('axis polar update', () => {
  const container = createDiv();
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: 'Other', value: 5 },
  ];

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
    .position('value')
    .color('type')
    .adjust('stack');

  chart.coordinate('theta');

  chart.render();

  function getAxes() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
  }

  function getGrids() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
  }

  it('axis update', async () => {
    let axes = getAxes();
    expect(axes.length).toBe(1);

    const [y] = axes;
    expect(y.component.get('ticks').length).toBe(5);

    await delay(100);

    chart.axis('value', {
      title: {
        style: {
          fill: 'red',
          text: 'value',
        },
        offset: 0,
        autoRotate: true,
      },
    });

    chart.render(true);

    axes = getAxes();
    expect(axes.length).toBe(1);

    // 更新逻辑保持引用
    expect(axes[0]).toBe(y);
    // 修改配置生效
    expect(axes[0].component.get('title').style.fill).toBe('red');
    expect(axes[0].component.get('title').style.text).toBe('value');
  });

  it('axis delete', async () => {
    const [y] = getAxes();
    await delay(100);

    chart.axis('value', false);

    chart.render(true);

    // 组件被销毁
    expect(y.component.destroyed).toBe(true);

    const axes = getAxes();
    expect(axes.length).toBe(0);
  });
});
