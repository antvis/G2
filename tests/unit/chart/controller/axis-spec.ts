import 'jest-extended';
import { COMPONENT_TYPE } from '../../../../src/constant';
import { Chart } from '../../../../src/index';
import { removeDom } from '../../../../src/util/dom';
import { createDiv } from '../../../util/dom';

describe('Axis', () => {
  const div = createDiv();
  let chart;
  it('rect x y', () => {
    chart = new Chart({
      container: div,
      height: 500,
      width: 600,
      autoFit: false,
      padding: 'auto',
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
    chart.axis('月份', {
      animateOption: {
        update: null,
      },
    });

    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('dodge');
    chart.render();

    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const [x, y] = axes;

    expect(x.component.getBBox().maxY).toBeCloseTo(494);
    expect(x.component.getBBox().maxY).toBe(494);

    // y axis 绘制的锚点有 8px 的偏移
    expect(y.component.getBBox().minX).toBe(0.5);

    expect(axes.length).toBe(2);

    // 图表初始化加载的时候不做 axis 动画
    expect(x.component.get('animate')).toBe(false);
    expect(x.component.get('animateOption')).toBeDefined();
    expect(x.component.get('animateOption').update).toBe(null);
    expect(y.component.get('animate')).toBe(false);
    expect(y.component.get('animateOption')).toBeDefined();

    // 默认 Y 轴生成 grid
    const grids = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID);
    expect(grids.length).toBe(1);
    expect(grids[0].component.get('animate')).toBe(false);
    expect(grids[0].component.get('animateOption')).toBeDefined();


    chart.changeSize(100, 100);
    expect(chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.GRID)[0].component.get('animate')).toBe(true);
  });

  it('view close animation', () => {
    chart = new Chart({
      container: div,
      height: 500,
      width: 600,
      autoFit: false,
      padding: 'auto',
    });
    chart.data([
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    ]);
    chart.animate(false);
    chart
      .interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust('dodge');
    chart.render();
    chart.render(true);

    const axes = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.AXIS);
    const [x, y] = axes;

    expect(x.component.get('animate')).toBe(false);
    expect(y.component.get('animate')).toBe(false);
  });

  afterEach(() => {
    chart.destroy();
  });

  afterAll(() => {
    removeDom(div);
  });
});
