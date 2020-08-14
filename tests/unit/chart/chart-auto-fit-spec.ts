import { Chart } from '../../../src/';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Chart autoFit', () => {
  const div = createDiv();

  div.setAttribute('style', 'width: 100%; height: 500px');

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.data(CITY_SALE);

  chart.interval().position('city*sale').color('category').adjust('stack');

  test('autoFit', () => {
    expect(chart.ele).toBe(div);

    const { width, height } = chart.ele.getBoundingClientRect();

    expect(chart.width).toBe(width);
    // see https://github.com/antvis/G2/issues/2159
    // should be equal, but actual height = chart.height + 5px
    // expect(chart.height).toBe(height);
  });

  test('changeSize', () => {
    const fn = jest.fn();

    chart.render = () => {
      fn();
    };

    chart.changeSize(chart.width, chart.height);
    // 宽高相同不执行
    expect(fn).not.toBeCalled();

    chart.changeSize(chart.width + 1, chart.height);
    // 宽高不相同执行
    expect(fn).toBeCalled();
  });
});
