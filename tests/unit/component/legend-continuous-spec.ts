import { Chart, DIRECTION } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv, removeDom } from '../../util/dom';

describe('Component', () => {
  const div = createDiv();
  let chart;
  it('legend size', () => {
    chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      padding: 16,
      autoFit: false,
    });

    chart.data(CITY_SALE);
    chart.scale('sale', {
      nice: true,
    });

    chart.point().position('city*sale').size('sale', [4, 12]);

    chart.legend('sale', {
      position: DIRECTION.TOP,
    });

    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    const size = legends[0].component;

    // @ts-ignore
    expect(size.get('rail').type).toBe('size');
    // @ts-ignore
    expect(size.get('track').style.fill).toBe('#5B8FF9');
    // @ts-ignore
    expect(size.get('min')).toBe(0);
    // @ts-ignore
    expect(size.get('max')).toBe(200);
    // @ts-ignore
    expect(size.get('layout')).toBe('horizontal');
  });

  it('legend color', () => {
    chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      padding: 16,
      autoFit: false,
    });

    chart.data(CITY_SALE);

    chart.point().position('city*sale').color('sale');

    chart.legend('sale', {
      position: DIRECTION.TOP,
    });
    chart.scale('sale', {
      nice: true,
    });

    chart.render();

    const legends = chart.getComponents().filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    const color = legends[0].component;
    // @ts-ignore
    expect(color.get('rail').type).toBe('color');
    // @ts-ignore
    expect(color.get('colors')).toEqual(['#5b8ff9', '#838373', '#6e93f3', '#e48a62', '#ff99c3']);
    // @ts-ignore
    expect(color.get('layout')).toBe('horizontal');
  });

  afterEach(() => {
    chart.destroy();
  });

  afterAll(() => {
    removeDom(div);
  });
});
