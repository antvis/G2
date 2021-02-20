/**
 * 图表渲染性能，根据火焰图进行分析和优化
 */
import { M } from 'miz';
import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

const DATA = M.arrayOf(M.shape({
  value: M.number(100, 110),
  name: M.string(8),
  type: M.constant('A')
}), 50000).mock();

describe('benchmark of bigdata', () => {
  it('pick', () => {
    const chart = new Chart({
      container: createDiv(),
      height: 400,
      autoFit: true,
    });

    chart.scale('value', {
      min: 0,
      max: 150,
    });

    chart.data(DATA);
    chart
      .line()
      .position('name*value');

    const div = createDiv();

    function onclick() {
      console.time('render');
      chart.render();
      console.timeEnd('render');
    }

    div.innerHTML = `<button>click to render</button>`;
    div.querySelector('button').onclick = onclick;

    // @ts-ignore
    window.chart = chart;
    // 不知道怎么写断言
    // 大概在我的电脑上，5w 数据点，350ms 内
    // chart.destroy();
  });
});