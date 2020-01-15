import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { removeDom } from '../../../../src/util/dom';
import { delay } from '../../../util/delay';
import { createDiv } from '../../../util/dom';

// rect
describe('axis rect update', () => {
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

  chart
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
    let grids = getGrids();

    expect(axes.length).toBe(2);
    expect(grids.length).toBe(1);

    const [x, y] = axes;
    expect(x.component.get('ticks').length).toBe(3);

    expect(x.component.get('animate')).toBe(false);
    expect(y.component.get('animate')).toBe(false);
    expect(grids[0].component.get('animate')).toBe(false);

    // 未设置，直接跟随主题的配置
    expect(y.component.get('title')).toBe(null);

    await delay(100);

    chart.axis('月份', {
      title: {
        style: {
          fill: 'red',
        },
        offset: 0,
        autoRotate: true,
      },
    });
    chart.axis('月均降雨量', {
      animate: false, // 关闭该轴动画
    });

    chart.changeData(data.slice(0, 2));

    chart.render(true);

    axes = getAxes();
    grids = getGrids();
    expect(axes.length).toBe(2);
    expect(grids.length).toBe(1);

    // 更新逻辑保持引用
    expect(axes[0]).toBe(x);
    expect(axes[1]).toBe(y);
    // 修改配置生效
    expect(axes[0].component.get('title').style.fill).toBe('red');
    expect(axes[0].component.get('title').style.text).toBe('月份');
    expect(axes[0].component.get('ticks').length).toBe(2);

    // 更新时动画开启
    expect(axes[0].component.get('animate')).toBe(true);
    expect(axes[1].component.get('animate')).toBe(false);
    expect(grids[0].component.get('animate')).toBe(false);

    // 设置 title text
    chart.axis('月份', {
      title: {
        style: {
          fill: 'red',
          text: 'Month',
        },
        offset: 0,
        autoRotate: true,
      },
    });

    chart.render(true);
    // 使用设置的 title
    expect(axes[0].component.get('title').style.text).toBe('Month');
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

  afterAll(() => {
    chart.destroy();
    removeDom(container);
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
    .interval({
      visible: false,
    })
    .position('value')
    .color('type')
    .adjust('stack');

  chart.coordinate('polar');

  chart.render();

  function getAxes() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
  }

  function getGrids() {
    return chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
  }

  it('axis update', async () => {
    let axes = getAxes();
    let grids = getGrids();

    expect(axes.length).toBe(1);
    expect(grids.length).toBe(1);

    const [y] = axes;
    expect(y.component.get('ticks').length).toBe(5);
    expect(y.component.get('animate')).toBe(false);
    expect(y.component.get('title')).toBe(null);
    expect(grids[0].component.get('animate')).toBe(false);
    expect(grids[0].component.get('animateOption')).toEqual(y.component.get('animateOption'));

    await delay(100);

    chart.axis('value', {
      title: {
        style: {
          fill: 'red',
        },
        offset: 0,
        autoRotate: true,
      },
      animate: false, // 关闭动画
    });

    chart.render(true);

    axes = getAxes();
    grids = getGrids();
    expect(axes.length).toBe(1);
    expect(grids.length).toBe(1);

    // 更新逻辑保持引用
    expect(axes[0]).toBe(y);
    // 修改配置生效
    expect(axes[0].component.get('title').style.fill).toBe('red');
    expect(axes[0].component.get('title').style.text).toBe('value'); // 自动使用字段名

    // y 轴动画被用户关闭
    expect(axes[0].component.get('animate')).toBe(false);
    expect(grids[0].component.get('animate')).toBe(false);

    chart.axis('value', {
      title: {
        style: {
          fill: 'red',
          text: 'VALUE',
        },
        offset: 0,
        autoRotate: true,
      },
      animate: false, // 关闭动画
    });

    chart.render(true);

    expect(axes[0].component.get('title').style.text).toBe('VALUE'); // 使用设置的字段名
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

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
