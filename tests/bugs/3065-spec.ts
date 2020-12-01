// 欢迎使用全新的 G2 4.0
import { IGroup } from '@antv/g-base';
import { Chart } from '../../src/';
import { createDiv } from '../util/dom';

describe('#3065', () => {
  it('theta 坐标系 label', () => {
    const chart = new Chart({
      container: createDiv(),
      height: 300, // 指定图表高度
      width: 300,
      autoFit: false,
    });

    chart.data([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ]);

    chart.coordinate('theta');

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('1*sold').color('genre').adjust('stack').label('genre', {
      layout: [{ type: 'pie-outer' }],
    });

    chart.render();
    let labels = chart.geometries[0].labelsContainer.getChildren();
    expect(labels[1].getBBox().maxX).not.toBeLessThanOrEqual(chart.getCoordinate().end.x);

    chart.clear();
    chart.interval().position('1*sold').color('genre').adjust('stack').label('genre', {
      layout: [{ type: 'pie-outer' }, { type: 'limit-in-plot', cfg: { action: 'ellipsis' } }],
    });
    chart.render();
    labels = chart.geometries[0].labelsContainer.getChildren();
    expect(labels[1].getBBox().maxX).toBeLessThanOrEqual(chart.getCoordinate().end.x);
    expect((labels[1] as IGroup).find((shape) => shape.get('type') === 'text').attr('text')).toMatch('...');
  });
});
