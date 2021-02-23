/**
 * 图表渲染性能，根据火焰图进行分析和优化
 */
import { M } from 'miz';
import { Chart } from '../../../src';
import { createDiv } from '../../util/dom';

const DATA = M.arrayOf(M.shape({
  x: M.number(0, 1000),
  y: M.number(0, 1000),
}), 40000).mock();

describe('benchmark of bigdata', () => {
  it('scatter', () => {
    const chart = new Chart({
      container: createDiv(),
      height: 400,
      autoFit: true,
    });

    chart.animate(false);

    chart.data(DATA);
    chart
      .point()
      .position('x*y');

    const div = createDiv();

    function onclick() {
      console.time('render scatter');
      chart.render();
      console.timeEnd('render scatter');
    }

    div.innerHTML = `<button>click to render</button>`;
    div.querySelector('button').onclick = onclick;

    // @ts-ignore
    window.chart = chart;
    // 不知道怎么写断言
    // 大概在我的电脑上，4w 数据点，首次运行 ~500ms，多次运行 300ms 内
    // chart.destroy();
  });
});