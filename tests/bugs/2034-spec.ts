import { Chart } from '../../src';
import { createDiv, removeDom } from '../util/dom';

describe('#2034', () => {
  const container = createDiv();
  let chart;

  it('scale not work for stack', () => {
    const data = [
      { x: '办公用品', z: '公司', y: 0.3051214729283124 },
      { x: '办公用品', z: '消费者', y: 0.522758685531211 },
      { x: '办公用品', z: '小型企业', y: 0.17211984154047666 },
      { x: '家具', z: '公司', y: 0.3319688893225353 },
      { x: '家具', z: '消费者', y: 0.4863182212499081 },
      { x: '家具', z: '小型企业', y: 0.1817128894275566 },
      { x: '技术', z: '公司', y: 0.32264893626977564 },
      { x: '技术', z: '消费者', y: 0.4923782883782607 },
      { x: '技术', z: '小型企业', y: 0.18497277535196366 },
    ];

    chart = new Chart({
      container,
      width: 400,
      height: 300,
    });

    chart.data(data);

    chart
      .interval()
      .position('x*y')
      .color('z')
      .adjust('stack');

    chart.render();

    const [ yScale ] = chart.getYScales();
    expect(yScale.min).toBe(0);
    expect(yScale.max).toBe(1);

    // 手动设置 min 和 max
    chart.scale('y', {
      min: -0.5,
      max: 1.5
    });
    chart.render(true);
    expect(chart.getYScales()[0].min).toBe(-0.5);
    expect(chart.getYScales()[0].max).toBe(1.5);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(container);
  });
});
