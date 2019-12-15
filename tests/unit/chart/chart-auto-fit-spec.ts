import { Chart } from '../../../src/';
import { CITY_SALE } from '../../util/data';
import { delay } from '../../util/delay';
import { createDiv } from '../../util/dom';

const data = [
  { city: '杭州', sale: 100, category: '电脑' },
  { city: '广州', sale: 30, category: '电脑' },
  { city: '上海', sale: 200, category: '鼠标' },
  { city: '呼和浩特', sale: 10, category: '鼠标' },
];

describe('Chart autoFit', () => {
  const div = createDiv();

  div.setAttribute('style', 'width: 100%; height: 500px');

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.data(CITY_SALE);

  chart
    .interval()
    .position('city*sale')
    .color('category')
    .adjust('stack');

  test('autoFit', () => {
    expect(chart.ele).toBe(div);

    const { width, height } = div.getBoundingClientRect();

    expect(chart.width).toBe(width);
    expect(chart.height).toBe(height);
  });
});
