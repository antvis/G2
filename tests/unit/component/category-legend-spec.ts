import { Chart } from '../../../src/';
import { COMPONENT_TYPE } from '../../../src/constant';
import { CITY_SALE } from '../../util/data';
import { createDiv } from '../../util/dom';

describe('Chart', () => {
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
    .interval()
    .position('city*sale')
    .color('category')
    .adjust({ type: 'dodge' });

  chart.render();

  it('legend component', () => {
    const legends = chart.getOptions().components.filter((co) => co.type === COMPONENT_TYPE.LEGEND);
    expect(legends.length).toBe(1);

    // two legend items
    // @ts-ignore
    expect(legends[0].component.get('items').length).toBe(2);
  });
});
