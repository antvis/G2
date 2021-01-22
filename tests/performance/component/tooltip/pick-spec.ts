/**
 * tooltip hover 的时候拾取性能性能很差，在 2000 条数据的时候，就已经卡的不行了。
 */
import MV from 'mock-variable';
import { Chart } from '../../../../src';
import { createDiv } from '../../../util/dom';

const DATA = MV.arrayOf(MV.shape({
  value: MV.number(100, 110),
  name: MV.string(8),
}), 20000).mock();

describe('benchmark of tooltip', () => {

  it('pick', () => {
    const chart = new Chart({
      container: createDiv(),
      width: 800,
      height: 400,
    });

    chart.scale('value', {
      min: 0,
      max: 120,
    });

    chart.data(DATA);
    chart
      .line()
      .position('name*value')
      .style({
        lineWidth: 3,
      })
      .shape('type', ['smooth']);

    chart.tooltip({
      shared: true,
    });

    chart.render();

    // 不知道怎么写断言，只能手动 hover 到线上面，看卡不卡
    chart.destroy();
  });
});