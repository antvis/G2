// 欢迎使用全新的 G2 4.0
import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#3073', () => {
  it('pie-outer 当数据存在 null 报错', () => {
    const data = [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: null },
    ];
    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500,
    });
    chart.data(data);

    chart.coordinate('theta', {
      radius: 0.75,
    });

    const interval = chart
      .interval()
      .adjust('stack')
      .position('value')
      .color('type')
      .label('value', {
        style: {
          fill: '#000',
          fontSize: 12,
        },
        layout: [{ type: 'pie-outer' }],
      });

    chart.render();

    const labels = chart.geometries[0].labelsContainer.getChildren();
    expect(labels.length).toBe(data.filter((d) => d.value).length);
  });
});
