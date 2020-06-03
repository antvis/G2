import { Chart } from '../../src';
import { COMPONENT_TYPE } from '../../src/constant';
import { createDiv } from '../util/dom';

describe('#0000', () => {
  // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
  const data = [
    { date: 1589212800000, sold: 275 },
    { date: 1589299200000, sold: 115 },
    { date: 1589472000000, sold: 120 },
    { date: 1589558400000, sold: 350 },
    { date: 1589644800000, sold: 150 },
  ];

  // Step 1: 创建 Chart 对象
  const chart = new Chart({
    container: createDiv(), // 指定图表容器 ID
    height: 300, // 指定图表高度
    autoFit: true,
  });
  const view = chart.createView({
    region: {
      start: {
        x: 0,
        y: 0.05,
      },
      end: {
        x: 1,
        y: 0.8,
      },
    },
    padding: [20, 40, 0, 30],
  });

  // Step 2: 载入数据源
  view.data(data);
  view.scale({
    date: {
      type: 'time',
      alias: '日期',
    },
    sold: {
      min: 0,
      alias: '销售量',
    },
  });

  view.axis('date', {
    grid: null,
  });

  // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  view.area().position('date*sold').style({
    fillStyle: 'l(90) 0:rgba(0, 85, 255, 1) 1:rgba(0, 85, 255, .13)',
  });

  view.annotation().regionFilter({
    top: true,
    start: [1589299200000, 'max'],
    end: [1589558400000, 0],
    color: 'red',
  });

  // Step 4: 渲染图表
  chart.render();

  it('region filter', () => {
    expect(chart).toBeDefined();
    const regionFilter = view.getComponents().filter((co) => co.type === COMPONENT_TYPE.ANNOTATION)[0].component;
    expect(regionFilter.get('type')).toEqual('regionFilter');
    expect(regionFilter.get('shapes')).toHaveLength(1);
  });
});
