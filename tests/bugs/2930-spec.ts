// 欢迎使用全新的 G2 4.0
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#2930', () => {
  const data = [
    { type: "分类一", value: NaN },
    { type: "分类二", value: undefined },
    { type: "分类三", value: null },
    { type: "分类四", value: -1.2 },
    { type: "分类五", value: -1 },
    { type: "分类六", value: 0 },
    { type: "其他", value: 1 },
  ];

  const chart = new Chart({
    container: createDiv(),
    width: 400,
    height: 300,
  });

  chart.coordinate('theta');
  // chart.animate(false) // @todo 数据isNaN过滤处理
  chart.data(data);
  chart.interval().position('value').color('type').adjust('stack');
  chart.render()

  it('check data is NaN', () => {
    chart.scale('y', {
      max: 0.5,
    });
    chart.render(true);
    const [yScale] = chart.getYScales();
    expect(yScale.max).toBe(1);
  });
});
