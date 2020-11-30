// 欢迎使用全新的 G2 4.0
import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#3056', () => {
  it('pie-outer 溢出', () => {
    // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    // Step 1: 创建 Chart 对象
    const chart = new Chart({
      container: createDiv(),
      width: 600, // 指定图表高度
      height: 272, // 指定图表高度
      autoFit: false,
    });

    // Step 2: 载入数据源
    chart.data(data);

    chart.coordinate('theta');
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart
      .interval()
      .position('sold')
      .color('genre')
      .label('genre', {
        layout: { type: 'pie-outer' },
        content: ({ genre }) => {
          return genre;
        },
      })
      .adjust('stack');

    chart.legend({ position: 'top' });
    // Step 4: 渲染图表
    chart.render();

    let labels = chart.geometries[0].labelsContainer.getChildren();
    let label2CenterY = labels[2].getBBox().minY + labels[2].getBBox().height / 2;
    expect(label2CenterY).toBeLessThanOrEqual(chart.getCoordinate().start.y);

    chart.changeData([...data, { genre: 'other-other', sold: 150 }]);
    chart.legend({ position: 'bottom' });
    chart.render();
    labels = chart.geometries[0].labelsContainer.getChildren();
    // @ts-ignore
    label2CenterY = labels[5].getBBox().minY - labels[5].getChildByIndex(0).getBBox().height/2
    expect(label2CenterY).toBeGreaterThanOrEqual(chart.getCoordinate().end.y);
  });
});
