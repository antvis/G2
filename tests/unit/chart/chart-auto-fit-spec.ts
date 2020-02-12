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
