import { Chart, DIRECTION } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Component', () => {
  it('legend size', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      padding: 16,
      autoFit: false,
    });

    chart.data(CITY_SALE);

    chart
      .point()
      .position('city*sale')
      .size('sale', [4, 12]);

    chart.legend('sale', {
      position: DIRECTION.TOP,
    });

    chart.render();

    const legends = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    const size = legends[0].component;

    // @ts-ignore
    expect(size.get('rail').type).toBe('size');
    // @ts-ignore
    expect(size.get('track').style.fill).toBe('#1890FF');
    // @ts-ignore
    expect(size.get('min')).toBe(0);
    // @ts-ignore
    expect(size.get('max')).toBe(200);
    // @ts-ignore
    expect(size.get('layout')).toBe('horizontal');
  });

  it('legend color', () => {
    const div = createDiv();

    const chart = new Chart({
      container: div,
      width: 800,
      height: 600,
      padding: 16,
      autoFit: false,
    });

    chart.data(CITY_SALE);

    chart
      .point()
      .position('city*sale')
      .color('sale');

    chart.legend('sale', {
      position: DIRECTION.TOP,
    });

    chart.render();

    const legends = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    const color = legends[0].component;
    // @ts-ignore
    expect(color.get('rail').type).toBe('color');
    // @ts-ignore
    expect(color.get('colors')).toEqual(['#5b8ff9', '#838373', '#ab989b', '#e4926c', '#ff99c3']);
    // @ts-ignore
    expect(color.get('layout')).toBe('horizontal');
  });
});
