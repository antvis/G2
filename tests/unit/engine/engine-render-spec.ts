import { Chart } from '../../../src/';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('multi-engine', () => {
  it('canvas', () => {
    const div = createDiv();
    const chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      renderer: 'canvas',
    });

    chart.data(CITY_SALE);
    chart.scale({
      city: {},
      sale: {},
    });

    chart
      .interval()
      .position('city*sale')
      .color('category');

    chart.render();

    expect(chart.renderer).toBe('canvas');
    expect(div.querySelector('canvas')).toBeDefined();
  });

  it('svg', () => {
    const div = createDiv();
    const chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      renderer: 'svg',
    });

    chart.data(CITY_SALE);
    chart.scale({
      city: {},
      sale: {},
    });

    chart
      .interval()
      .position('city*sale')
      .color('category');

    // TODO 切换成 svg 之后，出现 G 层 undefined 报错
    // chart.render();

    expect(chart.renderer).toBe('svg');
    expect(div.querySelector('svg')).toBeDefined();
  });
});
