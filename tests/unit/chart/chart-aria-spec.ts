import { Chart } from '../../../src';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Chart aria', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    autoFit: true,
  });

  chart.data(CITY_SALE);

  chart.interval().position('city*sale').color('category').adjust('stack');

  test('aria', () => {
    const label = '不同城市按照产品类别的堆积柱形图。';

    chart.aria({
      label,
    });

    expect(chart.ele.getAttribute('aria-label')).toBe(label);

    chart.aria(false);
    expect(chart.ele.getAttribute('aria-label')).toBe(null);

    chart.aria({
      label,
    });

    chart.destroy();

    expect(div.getAttribute('aria-label')).toBe(null);
  });
});
