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
      autoFit: true,
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
      autoFit: true,
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

    expect(chart.renderer).toBe('svg');
    expect(div.querySelector('svg')).toBeDefined();
  });
});
