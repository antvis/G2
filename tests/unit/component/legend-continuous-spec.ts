import { Chart } from '../../../src/';
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
      // @ts-ignore
      .point()
      .position('city*sale')
      .size('sale', [4, 12]);

    chart.render();

    const legends = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends).toBeDefined();
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
      // @ts-ignore
      .point()
      .position('city*sale')
      .color('sale');

    chart.render();

    const legends = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.LEGEND);

    expect(legends).toBeDefined();
  });
});
